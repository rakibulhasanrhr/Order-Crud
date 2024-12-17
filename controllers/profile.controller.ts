// All route and business logic should be here

import type { Request, Response, NextFunction } from "express";
import errorWrapper from "../middlewares/trycatchHandler.js";
import { sendResponse } from "../handlers/responses.js";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "../handlers/errorHandler.js";
// import { userSchema, type User } from "../schema/user.schema.js";
// import { generateUniqueFileName } from "../utils/generateUniqueFileName.js";
// import { uploadToBucket } from "../handlers/bucketHandler.js";
import { PrismaClient } from "@prisma/client";
import type { Profile } from "../schema/profile.schema.js";


const prisma = new PrismaClient();

const createProfile = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        // Validate the incoming data
        // const validatedData = userSchema.parse(req.body);
        // const { fullName, modulePermissions, password, } = validatedData
        const id = req.query.userId as string
        const { userId, ...profileData } = req.body as Profile

        // if (!req.file) {
        //     throw new ErrorHandler(
        //         "Please provide all required fields",
        //         StatusCodes.BAD_REQUEST
        //     );
        // }

        // const uniqueFileName = generateUniqueFileName(req.file.originalname);

        // await uploadToBucket(req, null, uniqueFileName);
        // const imageUrl = `https://jsgreenmedialtd.sgp1.digitaloceanspaces.com/${uniqueFileName}`;

        const newProfile = await prisma.profile.create({
            data: {
                ...profileData,
                user: {
                    connect: {
                        userId: id
                    }
                }

            },
        });

        sendResponse(
            res,
            StatusCodes.CREATED,
            newProfile,
            "Profile created successfully"
        );
    }
);

const getAllProfiles = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        // Validate the incoming data
        // const validatedData = userSchema.parse(req.body);
        // const { fullName, modulePermissions, password, } = validatedData
        // const { ...userData } = req.body as User




        // if (!req.file) {
        //     throw new ErrorHandler(
        //         "Please provide all required fields",
        //         StatusCodes.BAD_REQUEST
        //     );
        // }

        // const uniqueFileName = generateUniqueFileName(req.file.originalname);

        // await uploadToBucket(req, null, uniqueFileName);
        // const imageUrl = `https://jsgreenmedialtd.sgp1.digitaloceanspaces.com/${uniqueFileName}`;

        const allProfiles = await prisma.profile.findMany({

        });

        sendResponse(
            res,
            StatusCodes.OK,
            allProfiles,
            "All Profiles"
        );
    }
);

const updateProfile = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { profileId } = req.query as { profileId: string }
        const { ...profileData } = req.body as Profile
        const updatedProfile = await prisma.profile.update({
            where: { profileId },
            data: {
                ...profileData
            }
        })
        sendResponse(
            res,
            StatusCodes.OK,
            updatedProfile,
            "Profile updated successfully"
        );
    }
)

const deleteProfile = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { profileId } = req.query as { profileId: string }
        const deletedProfile = await prisma.profile.delete({
            where: { profileId },
        })


        sendResponse(
            res,
            StatusCodes.OK,
            deletedProfile,
            "Profile deleted successfully"
        );
    }
)
export { createProfile, getAllProfiles, updateProfile, deleteProfile }