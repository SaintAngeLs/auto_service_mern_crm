/**
 * @file check-auth.ts
 *
 * @description Provides authentication and authorization functionalities using JSON Web Tokens (JWT).
 */

import jwt from 'jsonwebtoken';
import {secretKey as authConfig} from '../utils/authConfig';
import Member from '../model/memberModel';
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwtUtil';

// Define JWT Payload structure
interface JwtPayload {
  userId: string;
  [key: string]: any;
}

// Extend Express' Request type
interface Request extends ExpressRequest {
  userId?: string;
}

/**
 * Middleware to verify if the incoming request has a valid token.
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token: string | undefined = req.headers["Authorization"] as string;

    if (!token) {
      res.status(403).send({ message: "No token provided!" });
      return;
    }

    // const decoded = jwt.verify(token, authConfig) as JwtPayload;
    const decoded = verifyJWT(token);

    if (decoded && decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error) {
    res.status(401).json({
      message: "LOGIN REQUIRED",
    });
  }
};

/**
 * Middleware to check if the authenticated user is an ADMIN.
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  Member.findById({ _id: req.userId }).exec()
    .then((user) => {
      if (user && user.role === "ADMIN") {
        next();
        return;
      }
      res.status(403).json({
        message: "Not Authorized",
      });
    })
    .catch((err) => {
      console.error("Authorization Error:", err);
      res.status(500).json({
        error: err,
      });
    });
};

export const checkAuth = {
  verifyToken,
  isAdmin,
};
