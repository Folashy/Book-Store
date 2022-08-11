import {DataTypes, Model} from 'sequelize'
import db from '../config/database.config'
import {BookInstance} from './books'

interface AuthorAttributes{
    id:string;  
    author:string;
    dateRegistered:number;
    age:number;
    email:string;
    password:string;
    address:string;
 
}

export class AuthorInstance extends Model<AuthorAttributes>{}


AuthorInstance.init({
id:{
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false,
},
author:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notNull:{
            msg:'full name is required'
        },
        notEmpty:{
            msg:'Please provide a full name'
        }
    }
},
dateRegistered:{
    type:DataTypes.NUMBER,
    allowNull:false, 
},
age:{
    type:DataTypes.NUMBER,
    allowNull:false, 
},
email:{
    type:DataTypes.STRING,
    allowNull:false, 
    unique: true,
    validate:{
        notNull:{
            msg:'email is required'
        },
        isEmail:{
            msg:'Please provide a first valid email'
        }
    }
},
password:{
    type:DataTypes.STRING,
    allowNull:false, 
    unique: true,
    validate:{
        notNull:{
            msg:'password is required'
        },
        notEmpty:{
            msg:'Please provide a password'
        }
    }
},
address:{
    type:DataTypes.STRING,
    allowNull:false, 
},


}, {
    sequelize: db,
    tableName:'Authors'
})
AuthorInstance.hasMany(BookInstance, {foreignKey:'authorId',
as:'Books table'
})

BookInstance.belongsTo(AuthorInstance,{foreignKey:'authorId',
as:'Authors'}) 

// BookInstance.hasMany(AuthorInstance, {foreignKey:'authorId',
// as:'Books table'
// })

// AuthorInstance.belongsTo(BookInstance,{foreignKey:'authorId',
// as:'Authors'}) 


