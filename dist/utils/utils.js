"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginSchema = exports.registerSchema = exports.updateBookSchema = exports.createBookSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createBookSchema = joi_1.default.object().keys({
    authorId: joi_1.default.string().lowercase().required(),
    name: joi_1.default.string().lowercase().required(),
    isPublished: joi_1.default.boolean().required(),
    datePublished: joi_1.default.number().required(),
    serialNumber: joi_1.default.string().required(),
});
exports.updateBookSchema = joi_1.default.object().keys({
    authorId: joi_1.default.string().lowercase(),
    name: joi_1.default.string().lowercase(),
    isPublished: joi_1.default.boolean(),
    datePublished: joi_1.default.number(),
    serialNumber: joi_1.default.string(),
});
exports.registerSchema = joi_1.default.object().keys({
    author: joi_1.default.string().required(),
    dateRegistered: joi_1.default.string().required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    address: joi_1.default.string().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: joi_1.default.ref("password")
}).with('password', 'confirm_password');
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});
//Generate Token
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: '3d' });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
