"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authorController_1 = require("../controller/authorController");
const authorController_2 = require("../controller/authorController");
router.post('/register', authorController_1.RegisterAuthor);
router.post('/login', authorController_1.LoginAuthor);
router.get('/getAuthors', authorController_2.getAuthors);
exports.default = router;
