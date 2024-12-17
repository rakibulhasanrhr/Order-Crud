import express from "express";
import { validate } from "../middlewares/validate.js";
import { addressSchema } from "../schema/address.schema.js";
import { createAddress, deleteAddress, getAllAddress, updateAddress, } from "../controllers/address.controller.js";
const router = express.Router();

// Routes needs to be defined here

router.route("/")
    .get(getAllAddress)
    .post(createAddress, validate(addressSchema, "body"), createAddress)
    .patch(updateAddress, validate(addressSchema, "body"), updateAddress)
    .delete(deleteAddress)
//   .post(uploadSingleImageBucket, validate(blogSchema, "body"), createBlog);


export default router;
