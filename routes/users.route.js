import express from "express";
import {getAllUsers,getUserById, addUser,updateUser, lendBookToUser,returnBookFromUser, deleteUser,} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", addUser);

router.put("/:id", updateUser);

router.put("/:id/:bookCode", lendBookToUser);

router.put("/:id/:bookCode", returnBookFromUser);

router.delete("/:id", deleteUser);

export default router;
