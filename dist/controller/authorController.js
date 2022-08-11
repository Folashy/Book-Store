"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthors = exports.LoginAuthor = exports.RegisterAuthor = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const author_1 = require("../model/author");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const books_1 = require("../model/books");
async function RegisterAuthor(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const duplicatEmail = await author_1.AuthorInstance.findOne({ where: { email: req.body.email } });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email"
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await author_1.AuthorInstance.create({
            id: id,
            author: req.body.author,
            dateRegistered: req.body.dateRegistered,
            age: req.body.age,
            email: req.body.email,
            password: passwordHash,
            address: req.body.address
        });
        res.status(201).json({
            msg: "You have successfully created a user",
            record
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'failed to register',
            route: '/register'
        });
    }
}
exports.RegisterAuthor = RegisterAuthor;
async function LoginAuthor(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const User = await author_1.AuthorInstance.findOne({ where: { email: req.body.email } });
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            res.status(401).json({
                message: "Password do not match"
            });
        }
        if (validUser) {
            res.status(200).json({
                message: "Successfully logged in",
                token,
                User
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to login',
            route: '/login'
        });
    }
}
exports.LoginAuthor = LoginAuthor;
async function getAuthors(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await TodoInstance.findAll({where: {},limit, offset})
        const record = await books_1.BookInstance.findAndCountAll({ limit, offset,
            include: [{
                    model: books_1.BookInstance,
                    attributes: ['id', 'authorId', 'name', 'isPublished', 'datePublished', 'serialNumber'],
                    //['id', 'author','dateRegistered', 'age', 'email', 'address'],
                    as: 'Books Table'
                }
            ]
        });
        res.status(200).json({
            msg: "You have successfully fetch all books",
            count: record.count,
            record: record.rows,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.getAuthors = getAuthors;
