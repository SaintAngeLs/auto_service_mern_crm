/**
 * @file authController.ts
 * 
 * @description Controller handling member authentication and registration.
 * This includes logging in and registering a new member.
 * 
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import Member from '../model/memberModel'; // Assuming memberModel.ts exports a type or interface Member
import {secretKey} from '../utils/authConfig'; 

interface MemberInput {
  email: string;
  password: string;
  name?: string;
  mobile?: string;
}


/**
 * Login a member using their email and password.
 * 
 * @function
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * @param {Function} next: Express next middleware function.
 * 
 * @returns {Object} JSON response indicating success or failure, and relevant data.
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const memberInput: MemberInput = req.body;

    const user = await Member.findOne({ email: memberInput.email }).exec();

    if (!user) {
      res.status(401).json({ message: "Authentication Failed" });
      return;
    }

    bcrypt.compare(memberInput.password, user.password, (err, response) => {
      if (err || !response) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }

      const token = jwt.sign(
        { userId: user._id },
          secretKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Authentication Successful",
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      });
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      error: err,
    });
  }
};


/**
 * Register a new member.
 * Fields required are name, email, and password. Mobile is optional.
 * 
 * @function
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * @param {Function} next: Express next middleware function.
 * 
 * @returns {Object} JSON response indicating success or failure, and relevant data.
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const memberInput: MemberInput = req.body;

  if (!memberInput.name || !memberInput.email || !memberInput.password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const existingUsers = await Member.find({ email: memberInput.email }).exec();

    if (existingUsers.length >= 1) {
      res.status(409).json({ message: "Member Already Exists" });
      return;
    }

    bcrypt.hash(memberInput.password, 10, (err, hash) => {
      if (err) {
        console.error("Hashing Error:", err);
        return res.status(500).json({
          error: err,
        });
      }

      const member = new Member({
        _id: new mongoose.Types.ObjectId(),
        name: memberInput.name,
        email: memberInput.email,
        password: hash,
        mobile: memberInput.mobile,
      });

      member.save()
        .then((result) => {
          console.log("Registered Member:", result);
          res.status(201).json({
            message: "Registered Successfully",
            user: result,
          });
        })
        .catch((err) => {
          console.error("Registration Error:", err);
          res.status(500).json({
            Registration_Error: err,
          });
        });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: err,
    });
  }
};
