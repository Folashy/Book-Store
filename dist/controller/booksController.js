"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const author_1 = require("../model/author");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function RegisterUser(req, res, next) {
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
        // const duplicatePhone = await AuthorInstance.findOne({where:{phonenumber:req.body.phonenumber}})
        // if(duplicatePhone){
        //  return res.status(409).json({
        //     msg:"Phone number is used"
        //  })
        // }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await author_1.AuthorInstance.create({
            id: id,
            author: req.body.fullname,
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
        res.status(500).json({
            msg: 'failed to register',
            route: '/register'
        });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
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
exports.LoginUser = LoginUser;
