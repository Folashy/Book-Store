import express from 'express'
 import {auth} from '../Middleware/auth'

const router = express.Router();

import {Books, getAllBooks,getSingleBook,updateBooks,deleteBooks} from '../controller/bookController'

router.post('/create', auth, Books);
router.get('/read',getAllBooks)
router.get('/read/:id',getSingleBook)
router.patch('/update/:id', auth, updateBooks)
router.delete('/delete/:id', auth, deleteBooks)


export default router
