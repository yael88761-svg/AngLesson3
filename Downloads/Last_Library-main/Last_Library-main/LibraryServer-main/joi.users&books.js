// import Joi from 'joi';
// const UserSchema = Joi.object({
//   id: Joi.number().integer().min(1),
  
//   nameUser: Joi.string()
//     .min(2)
//     .max(30)
//     .required(),

//   email: Joi.string()
//     .email()
//     .required(),

//   password: Joi.string()
//     .min(2)
//     .max(30)
//     .required(),


// });


// const BookSchema = Joi.object({
//   id: Joi.number().integer().min(1),

//   name: Joi.string()
//     .min(2)
//     .max(50)
//     .required(),

//   price: Joi.number()
//     .positive()
//     .precision(2)
//     .required(),

//   category: Joi.array()
//     .items(Joi.string().valid("kids", "history", "it", "novel", "science"))
//     .min(1),
// });