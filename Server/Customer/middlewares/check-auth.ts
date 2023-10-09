/**
 * @file check-auth.ts
 * 
 * @description Middleware functions for authentication and authorization.
 * 
 */

import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/customerModel';
import { secretKey } from '../config/authConfig';

interface Request extends ExpressRequest {
    userId?: string;
}


/**
 * Verifies the provided token in request headers.
 * 
 * @param {Request} req: Express request object. Expected to contain a JWT token.
 * @param {Response} res: Express response object.
 * @param {NextFunction} next: Express middleware function.
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers['x-access-token'] as string;

        if (!token) {
            res.status(403).send({ message: 'No token provided!' });
            return;
        }

        const decoded: any = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Authentication Failed',
        });
    }
};

/**
 * Checks if the user has a 'CUSTOMER' role.
 * 
 * @param {Request} req: Express request object. Expected to contain userId from `verifyToken` middleware.
 * @param {Response} res: Express response object.
 * @param {NextFunction} next: Express middleware function.
 */
export const isCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.userId).exec();

        if (user && user.role === 'CUSTOMER') {
            next();
        } else {
            res.status(403).json({
                message: 'Not Authorized',
            });
        }
    } catch (err) {
        console.error(`Authorization Error: ${err}`);
        res.status(500).json({
            error: err,
        });
    }
};

export const checkAuth = {
    verifyToken,
    isCustomer,
};
