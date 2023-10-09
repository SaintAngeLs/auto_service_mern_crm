/**
 * @file app.ts
 * 
 * @description Main application configuration and setup.
 * 
 */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./services/authServices";
import accountRoutes from "./services/accountServices";
import orderRoutes from "./services/orderServices";
import { mongoDBDriverConnectionString } from "./utils/dbConnection";

/** Middleware for handling non-matched routes */
import { Request, Response, NextFunction } from 'express';


const app = express();

/** 
 * CORS Middleware Configuration 
 * Handles preflight requests and headers for Cross-Origin Resource Sharing 
 */
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

/** Database Connection */
mongoose
  .connect(mongoDBDriverConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => {
    console.error("Database Connection Error: ", err);
  });

const db = mongoose.connection;

/** Log successful database connection */
db.once("open", () => {
  console.log("Connected to MongoDB Database");
});

/** Middleware to parse URL encoded data */
app.use(bodyParser.urlencoded({ extended: false }));

/** Middleware to parse JSON data */
app.use(bodyParser.json());

/** 
 * Middleware to handle CORS errors.
 * Allows server to respond with data when an external domain makes a request.
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
app.use("/customer/auth", authRoutes);
app.use("/customer/account", accountRoutes);
app.use("/customer/order", orderRoutes);


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        },
    });
});


/** Global Error Handling Middleware */
app.use((error: any, req: Request, res: Response, next: NextFunction)  => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

export default app;
