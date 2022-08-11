"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const books_1 = require("./books");
class AuthorInstance extends sequelize_1.Model {
}
exports.AuthorInstance = AuthorInstance;
AuthorInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'full name is required'
            },
            notEmpty: {
                msg: 'Please provide a full name'
            }
        }
    },
    dateRegistered: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'email is required'
            },
            isEmail: {
                msg: 'Please provide a first valid email'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'password is required'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: 'Authors'
});
AuthorInstance.hasMany(books_1.BookInstance, { foreignKey: 'authorId',
    as: 'Books table'
});
books_1.BookInstance.belongsTo(AuthorInstance, { foreignKey: 'authorId',
    as: 'Authors' });
// BookInstance.hasMany(AuthorInstance, {foreignKey:'authorId',
// as:'Books table'
// })
// AuthorInstance.belongsTo(BookInstance,{foreignKey:'authorId',
// as:'Authors'}) 
