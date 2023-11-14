/**
 * @file app.ts
 * 
 * @description Application setup and middlewares configuration.
 * 
 */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import accountRoutes from "./services/accountServices";
import orderRoutes from "./services/orderServices";
import { mongoDBDriverConnectionString } from "./utils/dbConnection";
import { setupManagerDatabaseIndexes } from "./utils/setupDatabaseIndexes";

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

mongoose.connect(mongoDBDriverConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(async () => {
  console.log("Connected to MongoDB");
  await setupManagerDatabaseIndexes(); 
  console.log("Creating the indexes... ");
})
.catch((err) => {
  console.error("Database Connection Error: " + err);
});

const db = mongoose.connection;

db.once("open", function () {
  console.log("Connected to MongoDb Database");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods Rest", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/manager/account", accountRoutes);
app.use("/manager/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  (error as any).status = 404;
  next(error);
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
