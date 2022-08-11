import express from 'express'
const router = express.Router();
import {RegisterAuthor,LoginAuthor} from '../controller/authorController'
import {getAuthors} from '../controller/authorController'


router.post('/register',RegisterAuthor)
router.post('/login',LoginAuthor)
router.get('/getAuthors',getAuthors)

export default router
