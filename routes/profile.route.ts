import express from "express";
import { validate } from "../middlewares/validate.js";
import { profileSchema } from "../schema/profile.schema.js";
import { createProfile, deleteProfile, getAllProfiles, updateProfile, } from "../controllers/profile.controller.js";
const router = express.Router();

// Routes needs to be defined here

router.route("/")
    .get(getAllProfiles)
    .post(createProfile, validate(profileSchema, "body"), createProfile)
    .patch(updateProfile, validate(profileSchema, "body"), updateProfile)
    .delete(deleteProfile)
//   .post(uploadSingleImageBucket, validate(blogSchema, "body"), createBlog);


export default router;
