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
import type { Order } from "../schema/order.schema.js";


const prisma = new PrismaClient();

const createOrder = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        // Validate the incoming data
        // const validatedData = userSchema.parse(req.body);
        // const { fullName, modulePermissions, password, } = validatedData
        const id = req.query.userId as string
        const { userId, ...orderData } = req.body as Order

        // if (!req.file) {
        //     throw new ErrorHandler(
        //         "Please provide all required fields",
        //         StatusCodes.BAD_REQUEST
        //     );
        // }

        // const uniqueFileName = generateUniqueFileName(req.file.originalname);

        // await uploadToBucket(req, null, uniqueFileName);
        // const imageUrl = `https://jsgreenmedialtd.sgp1.digitaloceanspaces.com/${uniqueFileName}`;

        const newOrder = await prisma.order.create({
            data: {
                ...orderData,
                orderCreatedBy: {
                    connect: {
                        userId: id
                    }
                }

            },
        });

        sendResponse(
            res,
            StatusCodes.CREATED,
            { newOrder },
            "Order created successfully"
        );
    }
);

const getAllOrders = errorWrapper(

    async (req: Request, res: Response) => {

        const filters = "name:as:Augy:like:userID:as:DPA00002542:like:email:as:acharker1r@technorati.com"
        const pairs = filters.split(":like:")

        const result = pairs.map(item => {
            const [key, value] = item.split(':as:');
            return { [key as string]: value }
        });
        console.log(result)

        const where: any = {};

        const allOrders = await prisma.order.findMany({
            where: {
                result: {

                }
            }
        });

        sendResponse(
            res,
            StatusCodes.CREATED,
            allOrders,
            "Order created successfully"
        );

        // const filters = req.query;
        // const orderKeys: string[] = [
        //     'orderId',
        //     'pickupLocation',
        //     'dropOffLocation',
        //     'ambulance',
        //     'phoneNumber',
        //     'fullName',
        //     'dateOfBirth',
        //     'email',
        //     'phone',
        //     'address',
        //     'orderCreatedBy',
        //     'createdAt',
        //     'updatedAt',
        //     'userId'
        // ];

        // const where: any = {};


        // for (const key of orderKeys) {
        //     if (filters[key]) {
        //         where[key] = {
        //             contains: String(filters[key]),
        //             mode: 'insensitive',
        //         };
        //     }
        // }
        // const allOrders = await prisma.order.findMany({
        //     where
        // });

        // sendResponse(
        //     res,
        //     StatusCodes.CREATED,
        //     allOrders,
        //     "Order created successfully"
        // );

    }







    // async (req: Request, res: Response, next: NextFunction) => {
    //     // Validate the incoming data
    //     // const validatedData = userSchema.parse(req.body);
    //     // const { fullName, modulePermissions, password, } = validatedData
    //     // const { ...userData } = req.body as User

    //     const { orderId, email, phoneNumber } = req.query;
    //     // if (!req.file) {
    //     //     throw new ErrorHandler(
    //     //         "Please provide all required fields",
    //     //         StatusCodes.BAD_REQUEST
    //     //     );
    //     // }

    //     // const uniqueFileName = generateUniqueFileName(req.file.originalname);

    //     // await uploadToBucket(req, null, uniqueFileName);
    //     // const imageUrl = `https://jsgreenmedialtd.sgp1.digitaloceanspaces.com/${uniqueFileName}`;


    //     // const { orderId } = req.query as { orderId: string };
    //     // const { phoneNumber } = req.query as { phoneNumber: string };
    //     // const { email } = req.query as { email: string };

    //     const filters: any = {};

    //     if (orderId) filters.orderId = orderId;
    //     if (email) filters.email = email;
    //     if (phoneNumber) filters.phoneNumber = phoneNumber;


    //     const allOrder = await prisma.order.findMany({
    //         where: filters,
    //         include: {
    //             orderCreatedBy: true,

    //         }

    //     });

    //     sendResponse(
    //         res,
    //         StatusCodes.OK,
    //         { allOrder },
    //         "All Order"
    //     );
    // }
);

const updateOrder = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.query as { orderId: string }
        const { ...orderData } = req.body as Order
        const updatedOrder = await prisma.order.update({
            where: { orderId },
            data: {
                ...orderData
            }
        })
        sendResponse(
            res,
            StatusCodes.OK,
            updatedOrder,
            "Order updated successfully"
        );
    }
)

const deleteOrder = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.query as { orderId: string }
        const deletedOrder = await prisma.order.delete({
            where: { orderId },
        })


        sendResponse(
            res,
            StatusCodes.OK,
            deletedOrder,
            "Order deleted successfully"
        );
    }
)






export { createOrder, getAllOrders, updateOrder, deleteOrder }