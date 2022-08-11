import {Request, Response, NextFunction} from 'express'
import {v4 as uuidv4} from 'uuid'
import {BookInstance } from '../model/books'
import {AuthorInstance } from '../model/author'
import {createBookSchema,options,updateBookSchema} from '../utils/utils'


export async function Books(req:Request | any, res:Response, next:NextFunction) {
   const id = uuidv4()
   // let books = {...req.body, id}
   try{ 
      const verified = req.user;
       const validationResult = createBookSchema.validate(req.body,options)
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message
          })
       }
      const record = await BookInstance.create({id, ...req.body, AuthorId: verified.id})
      res.status(201).json({
          msg:"You have successfully created a book",
          record
      })
   }catch(err){
      console.log(err)
      res.status(500).json({
       msg:'failed to create',
       route:'/create'
      })
   }

}

export async function getAllBooks(req:Request, res:Response, next:NextFunction) {
    try{ 
       const limit = req.query?.limit as number | undefined
       const offset = req.query?.offset as number | undefined

       const record = await BookInstance.findAll({limit, offset, 
         include:[{
            model:AuthorInstance,
            as:'Authors'
           }  
           ]
         })
         res.render('index',{record});
      //  res.status(200).json({
      //     msg:"You have successfully fetch all books",
      //     count:record,
      //     record:record
      //  })
}catch(error){
     res.status(500).json({
        msg:"failed to read",
        route:"/read"
     })
}

}


export async function getSingleBook(req:Request, res:Response, next:NextFunction) {
   try{ 
    const  {id} = req.params
   const record = await BookInstance.findOne({where: {id}})
   return res.status(200).json({
      msg:"Successfully gotten book information",
      record
   })

}catch(error){
    res.status(500).json({
       msg:"failed to read single book",
       route:"/read/:id"
    })
}

}



export async function updateBooks(req:Request, res:Response, next:NextFunction) {
   try{ 
      const  {id} = req.params
      const {name, isPublished,datePublished, serialNumber} = req.body
      const validationResult = updateBookSchema.validate(req.body,options)
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message
          })
       } 

      const record = await BookInstance.findOne({where: {id}})
       if(!record){
         return res.status(404).json({
            Error:"Cannot find existing book",
         })
       }
       const updatedrecord = await record.update({
         id:id,
         name:name,
         isPublished:isPublished,
         datePublished:datePublished,
         serialNumber:serialNumber
       })
       res.status(200).json({
          msg:"You have successfully updated your book",
          updatedrecord
       })
}catch(error){
    res.status(500).json({
       msg:"failed to update",
       route:"/update/:id"
    })
}

}



export async function deleteBooks(req:Request, res:Response, next:NextFunction) {
   try{ 
      const  {id} = req.params
      const record = await BookInstance.findOne({where: {id}})
      if(!record){
         return res.status(404).json({
            msg:"Cannot find book"
         })
      }
      const deletedRecord = await record.destroy()
      return res.status(200).json({
         msg: "Book deleted successfully",
         deletedRecord 
      })
}catch(error){
    res.status(500).json({
       msg:"failed to delete",
       route:"/delete/:id"
    })
}

}


