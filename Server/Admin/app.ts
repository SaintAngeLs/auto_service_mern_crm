/**
 * app.ts
 */

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// Import configurations and utilities
import { mongoDBDriverConnectionString } from './utils/dbConnection';
import { createDefaultUsers } from './default-users';

// Import routes for services used in the application
import authRoutes from './services/authServices';
import carRoutes from './services/carServices';
import serviceRoutes from './services/autoWashServices';
import orderRoutes from './services/orderServices';
import managerRoutes from './services/managerServices';

const app = express();

// Set CORS options
const corsOptions = {
  origin: "http://localhost:3001",
  
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(mongoDBDriverConnectionString).catch((err: Error) => {
  console.log("Database Connection Error:", err.message);
});

let db = mongoose.connection;

// Check the database connection
db.once("open", function () {
  console.log("Connected to MongoDb Database");
  // Create default users once the database is connected: with the ADMIN and the CUSTOMER roles
  createDefaultUsers();
});

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware for handling CORS errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Define routes for different services
app.use("/admin/auth", authRoutes);
app.use("/admin/car-func", carRoutes);
app.use("/admin/car-services", serviceRoutes);
app.use("/admin/order", orderRoutes);
app.use("/admin/manager", managerRoutes);

// Middleware for handling 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("Not found");
  error.status = 404;
  next(error);
});


// Middleware for handling other errors
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
