/**
 * @file userController.ts
 * 
 * @description Controllers for user registration and login operations.
 * 
 */

import { Request, Response, NextFunction } from 'express';
import User from '../model/customerModel'; // Make sure to update the model name if it's not customerModel for users.
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { secretKey }from '../config/authConfig';

import { createJWT } from '../utils/jwtUtil';

/**
 * Register a new user.
 *
 * @param {Request} req - Express request object containing user details.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express middleware function.
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('Inside Register');

    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        const existingUser = await User.find({ email: req.body.email }).exec();

        if (existingUser.length >= 1) {
            res.status(409).json({ message: 'User Already Exist' });
            return;
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: req.body.role,
        });

        const result = await user.save();
        console.log(result);
        res.status(201).json({ message: 'Registered Successfully', user: result });
    } catch (err) {
        console.error(`Registration Error: ${err}`);
        res.status(500).json({ Registration_Error: err });
    }
};

/**
 * Authenticate and log in a user.
 *
 * @param {Request} req - Express request object containing login credentials.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express middleware function.
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('Inside Login');
    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            res.status(401).json({ message: 'Authentication Failed' });
            return;
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
            // const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            const token = createJWT(
                { userId: user._id },
                3600 // 1 hour with 60 minutes
              );
        
            res.status(200).json({
                message: 'Authentication Successful',
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token,
            });
            console.log('Login Token',token);
            return;
        } else {
            console.log('User authentication FAILED');
            res.status(401).json({ message: 'Authentication Failed' });
            
            return;
        }
    } catch (err) {
        console.error(`Login Error: ${err}`);
        res.status(500).json({ Login_Error: err });
    }
};
