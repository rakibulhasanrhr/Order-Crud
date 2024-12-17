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
import type { Address } from "../schema/address.schema.js";


const prisma = new PrismaClient();

const createAddress = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        // Validate the incoming data
        // const validatedData = userSchema.parse(req.body);
        // const { fullName, modulePermissions, password, } = validatedData
        const id = req.query.userId as string
        const { userId, ...addressData } = req.body as Address

        // if (!req.file) {
        //     throw new ErrorHandler(
        //         "Please provide all required fields",
        //         StatusCodes.BAD_REQUEST
        //     );
        // }

        // const uniqueFileName = generateUniqueFileName(req.file.originalname);

        // await uploadToBucket(req, null, uniqueFileName);
        // const imageUrl = `https://jsgreenmedialtd.sgp1.digitaloceanspaces.com/${uniqueFileName}`;

        const newAddress = await prisma.address.create({
            data: {
                ...addressData,
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
            newAddress,
            "Address created successfully"
        );
    }
);

const getAllAddress = errorWrapper(
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

        const allAddress = await prisma.address.findMany({

        });

        sendResponse(
            res,
            StatusCodes.OK,
            allAddress,
            "All Address"
        );
    }
);

const updateAddress = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { addressId } = req.query as { addressId: string }
        const { ...addressData } = req.body as Address
        const updatedAddress = await prisma.address.update({
            where: { addressId },
            data: {
                ...addressData
            }
        })
        sendResponse(
            res,
            StatusCodes.OK,
            updatedAddress,
            "Profile updated successfully"
        );
    }
)

const deleteAddress = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { addressId } = req.query as { addressId: string }
        const deletedAddress = await prisma.address.delete({
            where: { addressId },
        })


        sendResponse(
            res,
            StatusCodes.OK,
            deletedAddress,
            "Profile deleted successfully"
        );
    }
)
export { createAddress, getAllAddress, updateAddress, deleteAddress }