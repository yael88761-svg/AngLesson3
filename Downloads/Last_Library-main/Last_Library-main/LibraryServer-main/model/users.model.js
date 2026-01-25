import Joi from 'joi';
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const { Schema, model } = mongoose;
// הגדרת הסכמה למשתמש
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, 
    role: { type:String, enum: ['admin', 'user'], required: true }
});

// מיידלוואר לפני שמירה – לדוגמה להצפנת סיסמה
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    //const saltRounds = process.env.SALT_ROUNDS || 12;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.method('comparePasswords', function (newPassword) {
    const isEqual = bcrypt.compareSync(newPassword, this.password);
    return isEqual;
});

// עבור כל הפונקציות שמחזירות את היוזר לקליינט
userSchema.set('toJSON', {
    virtuals: true,
    transform(doc, converted) {
        delete converted.__v;
        delete converted._id;
        delete converted.password;
        converted.password = '****';
    }
});

export default model('User', userSchema);
export { userSchema };


export const validateUser = {
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
    register: Joi.object({
        name: Joi.string().alphanum().trim().min(5).required(), // .trim() חיתוך רווחים
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password'),
        phone: Joi.string().pattern(/^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/).required(),
    })
};


