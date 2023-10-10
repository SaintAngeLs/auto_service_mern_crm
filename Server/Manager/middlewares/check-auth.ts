/**
 * @file check-auth.ts
 * 
 * @description Middleware functions to verify JWT tokens and check if a user is a mechanic.
 * 
 */

import jwt from "jsonwebtoken";
import { secretKey } from "../config/authConfig";
import Member from "../model/memberModel";
import { Request, Response, NextFunction } from 'express';

// ts-needs
declare module 'express-serve-static-core' {
    interface Request {
      userId?: string;
    }
  }
  

/**
 * Middleware to verify if the incoming request has a valid JWT token.
 * @param req Express request object.
 * @param res Express response object.
 * @param next Function to pass control to the next middleware function.
 */
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token: string | undefined = req.headers["x-access-token"] as string;

        if (!token) {
            res.status(403).send({ message: "No token provided!" });
            return;
        }

        const decoded: any = jwt.verify(token, secretKey); // replace `any` with your JWT payload type
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "LOGIN REQUIRED" });
    }
};

/**
 * Middleware to check if the user associated with the JWT token is a mechanic.
 * @param req Express request object.
 * @param res Express response object.
 * @param next Function to pass control to the next middleware function.
 */
const isMechanic = (req: Request, res: Response, next: NextFunction): void => {
    Member.findById({ _id: req.userId })
        .exec()
        .then((user: any) => { // replace `any` with your member model type
            if (user.role === "MECHANIC") {
                next();
                return;
            }
            res.status(403).json({ message: "Not Authorized" });
        })
        .catch((err: Error) => {
            console.error("Authorization Error:", err.message);
            res.status(500).json({ error: err.message });
        });
};

// Exporting the middleware functions
export default {
    verifyToken,
    isMechanic
};
