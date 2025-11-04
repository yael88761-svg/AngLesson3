
import express from "express";
export{getAllBooks, getBookById, addBook, updateBook, lendBook,returnBook,deleteBook} from "../controllers/books.controller.js"
const router = express.Router();

router.get('/',getAllBooks);

router.get('/:id',getBookById);

router.post('/', addBook)

router.put('/:id',updateBook)

router.put('/:code/:name',lendBook);

router.put('/:id',returnBook)

router.delete('/:id',deleteBook)


export default router;