const express = require('express');
const {getAllBooks,getSingleBookById,addNewBook,updateBook,deleteBook,createAuthor,getBookByAuthor} = require('../controllers/book-controller')

//create express route
const router = express.Router()

//all the routes related to books only

router.get('/get',getAllBooks)
router.get('/get/:id',getSingleBookById)
router.post('/add',addNewBook)
router.put('/update/:id',updateBook)
router.delete('/delete/:id',deleteBook)
router.post('/author',createAuthor)
router.get('/getbyauthor/:id',getBookByAuthor)

module.exports = router;