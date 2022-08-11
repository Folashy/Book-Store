"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../Middleware/auth");
const router = express_1.default.Router();
const bookController_1 = require("../controller/bookController");
router.post('/create', auth_1.auth, bookController_1.Books);
router.get('/read', bookController_1.getAllBooks);
router.get('/read/:id', bookController_1.getSingleBook);
router.patch('/update/:id', auth_1.auth, bookController_1.updateBooks);
router.delete('/delete/:id', auth_1.auth, bookController_1.deleteBooks);
exports.default = router;
