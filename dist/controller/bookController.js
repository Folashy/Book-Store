"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooks = exports.updateBooks = exports.getSingleBook = exports.getAllBooks = exports.Books = void 0;
const uuid_1 = require("uuid");
const books_1 = require("../model/books");
const author_1 = require("../model/author");
const utils_1 = require("../utils/utils");
async function Books(req, res, next) {
    const id = (0, uuid_1.v4)();
    // let books = {...req.body, id}
    try {
        const verified = req.user;
        const validationResult = utils_1.createBookSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await books_1.BookInstance.create({ id, ...req.body, AuthorId: verified.id });
        res.status(201).json({
            msg: "You have successfully created a book",
            record
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'failed to create',
            route: '/create'
        });
    }
}
exports.Books = Books;
async function getAllBooks(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await books_1.BookInstance.findAll({ limit, offset,
            include: [{
                    model: author_1.AuthorInstance,
                    as: 'Authors'
                }
            ]
        });
        res.render('index', { record });
        //  res.status(200).json({
        //     msg:"You have successfully fetch all books",
        //     count:record,
        //     record:record
        //  })
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read"
        });
    }
}
exports.getAllBooks = getAllBooks;
async function getSingleBook(req, res, next) {
    try {
        const { id } = req.params;
        const record = await books_1.BookInstance.findOne({ where: { id } });
        return res.status(200).json({
            msg: "Successfully gotten book information",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single book",
            route: "/read/:id"
        });
    }
}
exports.getSingleBook = getSingleBook;
async function updateBooks(req, res, next) {
    try {
        const { id } = req.params;
        const { name, isPublished, datePublished, serialNumber } = req.body;
        const validationResult = utils_1.updateBookSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await books_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing book",
            });
        }
        const updatedrecord = await record.update({
            id: id,
            name: name,
            isPublished: isPublished,
            datePublished: datePublished,
            serialNumber: serialNumber
        });
        res.status(200).json({
            msg: "You have successfully updated your book",
            updatedrecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id"
        });
    }
}
exports.updateBooks = updateBooks;
async function deleteBooks(req, res, next) {
    try {
        const { id } = req.params;
        const record = await books_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find book"
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            msg: "Book deleted successfully",
            deletedRecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id"
        });
    }
}
exports.deleteBooks = deleteBooks;
