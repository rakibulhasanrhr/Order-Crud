// All route and business logic should be here

import type { Request, Response, NextFunction } from "express";
import errorWrapper from "../middlewares/trycatchHandler.js";
import { sendResponse } from "../handlers/responses.js";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "../handlers/errorHandler.js";
import { userSchema, type User } from "../schema/user.schema.js";
// import { generateUniqueFileName } from "../utils/generateUniqueFileName.js";
// import { uploadToBucket } from "../handlers/bucketHandler.js";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const createUser = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        // Validate the incoming data
        // const validatedData = userSchema.parse(req.body);
        // const { fullName, modulePermissions, password, } = validatedData

        const { ...userData } = req.body as User




        // if (!req.file) {
        //     throw new ErrorHandler(
        //         "Please provide all required fields",
        //         StatusCodes.BAD_REQUEST
        //     );
        // }

        // const uniqueFileName = generateUniqueFileName(req.file.originalname);

        // await uploadToBucket(req, null, uniqueFileName);
        // const imageUrl = `https://jsgreenmedialtd.sgp1.digitaloceanspaces.com/${uniqueFileName}`;

        const newUser = await prisma.user.create({
            data: {
                ...userData,

            },
        });

        sendResponse(
            res,
            StatusCodes.CREATED,
            newUser,
            "User created successfully"
        );
    }
);

const getAllUsers = errorWrapper(
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

        const allUsers = await prisma.user.findMany({
            include: {
                Order: {}
            }
            // where: { isDeleted: false },
            // include: {
            //     profile: { select: { licenseFile: true } },
            //     address: { select: { fullAddress: true } }
            // }

        });

        sendResponse(
            res,
            StatusCodes.OK,
            allUsers,
            "All Users"
        );
    }
);

const getSingleUserById = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params as { id: string };

        const singleUser = await prisma.user.findUnique({
            where: {
                userId: id,
                isDeleted: false
            }
        })

        if (!singleUser) {
            throw new ErrorHandler("User not found", StatusCodes.NOT_FOUND)
        }

        sendResponse(
            res,
            StatusCodes.OK,
            singleUser,
            "Single Users"
        );
    }
)

const updateUser = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.query as { userId: string }
        const { ...userData } = req.body as User
        const updatedUser = await prisma.user.update({
            where: { userId },
            data: {
                ...userData
            }
        })
        sendResponse(
            res,
            StatusCodes.OK,
            { updatedUser },
            "User Updated successfully"
        );
    }
)

const deleteUser = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.query as { userId: string }
        const deletedUser = await prisma.user.delete({
            where: { userId },
        })


        sendResponse(
            res,
            StatusCodes.OK,
            deletedUser,
            "User deleted successfully"
        );
    }
)
export { createUser, getAllUsers, updateUser, deleteUser, getSingleUserById }