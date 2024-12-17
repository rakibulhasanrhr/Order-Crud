import express from "express";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../schema/user.schema.js";
import { createUser, deleteUser, getAllUsers, getSingleUserById, updateUser } from "../controllers/user.controller.js";
const router = express.Router();

// Routes needs to be defined here

router.route("/")
    .get(getAllUsers)
    .post(createUser, validate(userSchema, "body"), createUser)
    .patch(updateUser, validate(userSchema, "body"), updateUser)
    .delete(deleteUser)
    .get(getSingleUserById)
//   .post(uploadSingleImageBucket, validate(blogSchema, "body"), createBlog);

router.route("/:id")
    .get(getSingleUserById)


export default router;
