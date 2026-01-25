import { isValidObjectId } from "mongoose";
import user from "../model/users.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 5, name = '' } = req.query;
        const result = await user.find({ name: new RegExp(name, 'i') })
            .skip((page - 1) * limit) 
            .limit(limit);

        res.json(result);
    } catch (error) {
        next({ message: error.message });
    }
};

export const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!isValidObjectId(id)) {
            return next({ status: 404, message: `User ${id} not found!` });
        }

        const p = await User.findById(id);

        if (!p) {
            return next({ status: 404, message: `User ${id} not found!` });
        }
        res.json(p);
    } catch (error) {
        next({ message: error.message });
    }
}

export const addUser = async (req, res, next) => {
    try {
        const newUser = new user({
            ...req.body,
            img: req.file?.path,
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        next({ status: 409, message: error.message });
    }
};

export const updateUser = async (req, res, next) => {
    console.log(req.body);

    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return next({ status: 404, message: `user ${id} not found!` });
    }

    try {
        const p = await user.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true, 
            runValidators: true
        });

        if (!p) {
            return next({ status: 404, message: `user ${id} not found!` });
        }

        res.json(p);
    } catch (error) {
        next({ message: error.message });
    }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return next({ status: 404, message: `user ${id} not found!` });
    }

    try {
        const p = await user.findByIdAndDelete(id);

        if (!p) { // לא ביצע מחיקה
            return next({ status: 404, message: `user ${id} not found!` });
        }

        res.status(204).end();
    } catch (error) {
        next({ message: error.message });
    }
};




