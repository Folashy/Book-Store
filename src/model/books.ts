import {DataTypes, Model} from 'sequelize'
import db from '../config/database.config'


interface BooksId{
    id:string;
    authorId:string;
    name:string;
    isPublished:boolean;
    datePublished:number;
    serialNumber:string;
}

export class BookInstance extends Model<BooksId>{}

BookInstance.init({
id:{
    type:DataTypes.STRING,
    primaryKey:true,
    allowNull:false,
},
authorId:{
    type:DataTypes.STRING,
    allowNull:false,
},
name:{
    type:DataTypes.STRING,
    allowNull:false,
},
isPublished:{
    type:DataTypes.BOOLEAN,
    allowNull:false, 
},
datePublished:{
    type:DataTypes.NUMBER,
    allowNull:false, 
},
serialNumber:{
    type:DataTypes.STRING,
    allowNull:false, 
},
}, {
    sequelize: db,
    tableName:'Books Table'
})