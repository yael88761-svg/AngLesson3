
import express from "express";
import { getAllBooks, getBookById, addBook, updateBook, lendBook, returnBook, deleteBook } from "../controllers/books.controller.js";

// import multer from "multer";
// const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.post('/', addBook)

router.put('/:id', updateBook)

router.put('/:id/:name', lendBook);

router.put('/:id', returnBook)

router.delete('/:id', deleteBook)

// router.post("/with-image", upload.single("image"), addBookWithImage);

export default router;