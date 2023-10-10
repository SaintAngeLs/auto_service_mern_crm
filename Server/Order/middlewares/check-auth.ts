/**
 * @file check-auth.ts
 * 
 * @description Middleware to verify JWT tokens for user authentication.
 * 
 */

import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import { secretKey } from '../config/authConfig';

// Define your JWT payload structure, extending the default one
interface JwtPayload extends DefaultJwtPayload {
  userId: string;
}

export const verifyToken = (req: any, res: any, next: any) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    const decoded = jwt.verify(token, secretKey);

    // Type guard to check if decoded is of JwtPayload type
    if ((decoded as JwtPayload).userId) {
      req.userId = (decoded as JwtPayload).userId;
      next();
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed"
    });
  }
};

export default {
  verifyToken
};
