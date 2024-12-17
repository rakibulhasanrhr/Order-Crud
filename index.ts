import express from "express";
import { errorHandler } from "./handlers/errorHandler.js";
import cors from "cors";
import helmet from "helmet";

// Routes
import userRouter from "./routes/user.route.js";
import profileRouter from "./routes/profile.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js"

// Initiators
import Logger from "./utils/logger.js";
import { initializeDatabase } from "./config/db.config.js";
import { routeNotFound } from "./handlers/notFound.js";

// environment checker
import { env } from "./utils/envCheck.js";

const PORT = process.env.PORT || 3000;
const app = express();

const logger = new Logger("AppLogger");

app.set("trust proxy", true);
app.disable("x-powered-by");
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Initiators
initializeDatabase();

// Routes
app.use("/user", userRouter);
app.use("/profile", profileRouter)
app.use("/address", addressRouter)
app.use("/order", orderRouter)

app.use("*", routeNotFound);
app.use(errorHandler);

app
  .listen(PORT, () => {
    logger.info(`Application running on port ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
