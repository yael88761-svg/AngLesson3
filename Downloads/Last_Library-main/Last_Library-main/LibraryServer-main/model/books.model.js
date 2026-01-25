import mongoose from "mongoose";
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    img: { type: String },
    isBorrowed: { type: Boolean, default: false },
    lends: [
        {
            date: { type: String },       // תקין
            customerId: { type: String }  // תקין
        }
    ]
});

const Book = model('Book', bookSchema);

export default Book;
export { bookSchema };





// import Joi from "joi";
// import mongoose from "mongoose";
// export const bookSchema = Joi.object({
//   id: Joi.number().integer().required(),
//   name: Joi.string().min(1).required(),
//   author: Joi.string().min(1).required(),
//   isBorrowed: Joi.boolean().default(false),
//   lends: Joi.array().items(
//     Joi.object({
//       date: Joi.string().required(),
//       customerId: Joi.string().required()
//     })
//   ).default([])
// });

// const Book = mongoose.model('Book', bookSchema);
// export default Book;
// //export { bookSchema };