import express from "express";
import { validate } from "../middlewares/validate.js";
import { orderSchema } from "../schema/order.schema.js";
import { createOrder, getAllOrders, updateOrder, deleteOrder } from "../controllers/order.controller.js";
const router = express.Router();

// Routes needs to be defined here

router.route("/")
    .get(getAllOrders)
    .post(createOrder, validate(orderSchema, "body"), createOrder)
    .patch(updateOrder, validate(orderSchema, "body"), updateOrder)
    .delete(deleteOrder)
//   .post(uploadSingleImageBucket, validate(blogSchema, "body"), createBlog);



export default router;
