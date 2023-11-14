/**
 * @file app.ts
 * 
 * @description Express app setup and configuration.
 * 
 */

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import orderRoutes from './services/orderServices';
import { mongoDBDriverConnectionString } from './utils/dbConnection';
import { setupOrderDatabaseIndexes } from './utils/setupDatabaseIndexes';


class ExtendedError extends Error {
  status?: number;
}


const app = express();

// CORS Middleware configuration
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));

// Database Connection
mongoose.connect(mongoDBDriverConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  console.log('Index Creating ...')
  await setupOrderDatabaseIndexes(); 
})
.catch((err: Error) => {
  console.error(`Database Connection Error: ${err.message}`);
});

const db = mongoose.connection;

// Check if Database Connection is open
db.once("open", () => {
  console.log("Connected to MongoDb Database");
});

app.use(bodyParser.urlencoded({ extended: false }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Middleware for preventing CORS ERRORS
app.use((req: Request, res: Response, next: NextFunction) => {
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

app.use("/order", orderRoutes);

// Server Side Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new ExtendedError("Not found");
  error.status = 404;
  next(error);
});

app.use((error: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
