const Book = require('../models/book')
const author = require('../models/author')
const getAllBooks = async(req,res) => {
    try {
        const allBooks = await Book.find({})
        if(allBooks) {
            res.status(200).json({
                success: true,
                message: 'all books',
                data: allBooks
            })
        }
        else {
            res.status(404).json({
                message: 'No records available',
                data: allBooks
            })
        }
    } catch (error) {
        console.log('Error-->', error);
    }
}
const getSingleBookById = async(req,res) => {
    try {
        const myBookId = req.params.id;
        const bookDetails = await Book.findById(myBookId);
        if(!bookDetails) {
            res.status(201).json({
                success: false,
                message: 'No records available',
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: 'My Book',
            data: bookDetails
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong',
            data: []
        })
    }
}

const addNewBook = async(req,res) => {
    try {
        const newBookFormData = req.body;
        const newbook = await Book.create(newBookFormData);
        if(newbook) {
            res.status(200).json({
                success: true,
                message:'book added',
                data: newbook
            })
        }
        else{
            console.log('Error adding book');
        }

    } catch (error) {
        console.log('Error adding book', error);
        
    }
}

const updateBook = async(req,res) => {
    try {
        const myBookId = req.params.id;
        const bookdetToUpdate = req.body;
        const updatedBookDetails = await Book.findByIdAndUpdate(myBookId,bookdetToUpdate,{new:true});
        if(!updatedBookDetails) {
            res.status(201).json({
                success: false,
                message: 'No such book found to update',
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: 'update Book',
            data: updatedBookDetails
        })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

const deleteBook = async(req,res) => {
    try {
        const myBookId = req.params.id;
        const deletedBookDetails = await Book.findByIdAndDelete(myBookId);
        if(!deletedBookDetails) {
            res.status(201).json({
                success: false,
                message: 'No such book found to delete',
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: 'Deleted Book',
            data: deletedBookDetails
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

const createAuthor = async(req,res) => {
    try {
        const newcreateAuthor = req.body;
        const newnewcreateAuthor = await author.create(newcreateAuthor);
        if(newnewcreateAuthor) {
            res.status(200).json({
                success: true,
                message:'book added',
                data: newnewcreateAuthor
            })
        }
        else{
            console.log('Error createAuthor book');
        }

    } catch (error) {
        console.log('Error createAuthor book', error);
        
    }
}
const getBookByAuthor = async(req,res) => {
    try {
        const myBookId = req.params.id;
        const bookDetails = await Book.findById(myBookId).populate('author');
        if(!bookDetails) {
            res.status(201).json({
                success: false,
                message: 'No records available',
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: 'My Book',
            data: bookDetails
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong',
            data: []
        })
    }
}
module.exports = {getAllBooks,getSingleBookById,addNewBook,updateBook,deleteBook,createAuthor,getBookByAuthor}