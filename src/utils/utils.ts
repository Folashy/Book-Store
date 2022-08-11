import Joi from 'joi'
import jwt from 'jsonwebtoken'
export const createBookSchema = Joi.object().keys({
    authorId:Joi.string().lowercase().required(),
    name:Joi.string().lowercase().required(),
    isPublished:Joi.boolean().required(),
    datePublished:Joi.number().required(),
    serialNumber:Joi.string().required(),
});
export const updateBookSchema = Joi.object().keys({
    authorId:Joi.string().lowercase(),
    name:Joi.string().lowercase(),
    isPublished:Joi.boolean(),
    datePublished:Joi.number(),
    serialNumber:Joi.string(),
});

export const registerSchema = Joi.object().keys({
    author:Joi.string().required(),
    dateRegistered:Joi.string().required(),
    age:Joi.number().required(),
    email:Joi.string().trim().lowercase().required(),
    address:Joi.string().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password:Joi.ref("password")
}).with('password', 'confirm_password')
    

export const loginSchema = Joi.object().keys({
    email:Joi.string().trim().lowercase().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  
})

   

//Generate Token
export const generateToken=(user:{[key:string]:unknown}):unknown=>{
  const pass = process.env.JWT_SECRET as string
   return jwt.sign(user,pass, {expiresIn:'3d'})
}

export const options ={  
    abortEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
}