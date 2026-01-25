import { isValidObjectId } from "mongoose";
import Book, { bookSchema } from "../model/books.model.js";
//import Book from "../model/books.model.js";

export const getAllBooks = async (req, res, next) => {
    try {
        const { page = 1, limit = 5, name = '' } = req.query;
        const result = await Book.find({ name: new RegExp(name, 'i') })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json(result);
    } catch (error) {
        next({ message: error.message });
    }
};

export const getBookById = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!isValidObjectId(id)) {
            return next({ status: 404, message: `Book ${id} not found!` });
        }

        const p = await Book.findById(id);

        if (!p) {
            return next({ status: 404, message: `book ${id} not found!` });
        }

        res.json(p);
    } catch (error) {
        next({ message: error.message });
    }
}

export const addBook = async (req, res, next) => {
    try {
        const newBook = new Book({
            ...req.body,
            img: req.file?.path,
        });

        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        next({ status: 409, message: error.message });
    }
};

export const updateBook = async (req, res, next) => {
    console.log(req.body);

    const { id } = req.params; 

    if (!isValidObjectId(id)) {
        return next({ status: 404, message: `book ${id} not found!` });
    }

    try {
        const p = await Book.findByIdAndUpdate(id, {
            $set: req.body 
        }, {
            new: true, 
            runValidators: true 
        });

        if (!p) {
            return next({ status: 404, message: `book ${id} not found!` });
        }

        res.json(p);
    } catch (error) {
        next({ message: error.message });
    }
};

export const deleteBook = async (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return next({ status: 404, message: `book ${id} not found!` });
    }

    try {
        const p = await Book.findByIdAndDelete(id);

        if (!p) {
            return next({ status: 404, message: `book ${id} not found!` });
        }

        res.status(204).end();
    } catch (error) {
        next({ message: error.message });
    }
};

export const lendBook = async (req, res, next) => {
    const { id, customer } = req.params; 

    try {
        if (!isValidObjectId(id)) {
            return next({ status: 404, message: `book ${id} not found!` });
        }

        const book = await Book.findById(id);
        if (!book) {
            return next({ status: 404, message: `book ${id} not found!` });
        }

        if (book.isBorrowed) {
            return next({ status: 409, message: "book already borrowed" });
        }

        book.isBorrowed = true;
        book.lends.push({
            date: new Date().toISOString(),
            customerId: customer
        });

        await book.save();

        res.json(book);
    } catch (error) {
        next({ message: error.message });
    }
};

export const returnBook = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!isValidObjectId(id)) {
            return next({ status: 404, message: `book ${id} not found!` });
        }

        const book = await Book.findById(id);

        if (!book) {
            return next({ status: 404, message: `book ${id} not found!` });
        }

        book.isBorrowed = false;
        await book.save();

        res.json(book);
    } catch (error) {
        next({ message: error.message });
    }
};





















// import { isValidObjectId } from "mongoose";
// import Book from "../model/books.model.js";


// export const getAllBooks = async (req, res, next) => {
//     try {
//         const { page = 1, limit = 5, name = "" } = req.query;

//         const result = await Book.find({
//             name: new RegExp(name, "i")
//         })
//             .skip((page - 1) * limit)
//             .limit(limit);

//         res.json(result);
//     } catch (error) {
//         next({ message: error.message });
//     }
// };

// export const getBookById = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         if (!isValidObjectId(id)) {
//             return next({ status: 404, message: `book ${id} not found!` });
//         }

//         const book = await Book.findById(id);

//         if (!book) {
//             return next({ status: 404, message: `book ${id} not found!` });
//         }

//         res.json(book);
//     } catch (error) {
//         next({ message: error.message });
//     }
// };

// export const addBook = async (req, res, next) => {
//     try {
//         const newBook = new Book({
//             ...req.body,
//             image: req.file?.path   // אם מגיע קובץ
//         });

//         await newBook.save();
//         res.json(newBook);
//     } catch (error) {
//         next({ message: error.message });
//     }
// };


// export const updateBook = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         if (!isValidObjectId(id)) {
//             return next({ status: 404, message: `book ${id} not found!` });
//         }

//         const updated = await Book.findByIdAndUpdate(
//             id,
//             { $set: req.body },
//             { new: true } // מחזיר את הערך המעודכן
//         );

//         if (!updated) {
//             return next({ status: 404, message: `book ${id} not found!` });
//         }

//         res.json(updated);
//     } catch (error) {
//         next({ message: error.message });
//     }
// };


// export const deleteBook = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         if (!isValidObjectId(id)) {
//             return next({ status: 404, message: `book ${id} not found!` });
//         }

//         const deleted = await Book.findByIdAndDelete(id);

//         if (!deleted) {
//             return next({ status: 404, message: `book ${id} not found!` });
//         }

//         res.status(204).end();
//     } catch (error) {
//         next({ message: error.message });
//     }
// };

// export const lendBook = async (req, res, next) => {
//     const { id, customer } = req.params;

//     try {
//         if (!isValidObjectId(id)) {
//             return next({ status: 404, message: `book ${id} not found!` });
//         }

//         const book = await Book.findById(id);

//         if (!book) {
//             return next({ status: 404, message: `book ${id} not found!` });
//         }

//         if (book.isBorrowed) {
//             return next({ status: 409, message: "book already borrowed" });
//         }

//         book.isBorrowed = true;
//         book.lends.push({
//             date: new Date().toISOString(),
//             customerId: customer
//         });

//         await book.save();
//         res.json(book);
//     } catch (error) {
//         next({ message: error.message });
//     }
// };


// /**
//  * POST /books/return/:id
//  * החזרת ספר
//  */


// /**
//  * POST /books/upload
//  * הוספת ספר עם תמונה
//  * JOI נבדק במידלוואר
//  */
// export const addBookWithImage = async (req, res, next) => {
//     try {
//         const newBook = new Book({
//             ...req.body,
//             image: req.file?.path
//         });

//         await newBook.save();
//         res.json(newBook);
//     } catch (error) {
//         next({ message: error.message });
//     }
// };
