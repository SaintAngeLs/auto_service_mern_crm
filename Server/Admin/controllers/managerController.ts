/**
 * @file managerController.ts
 * 
 * @description Provides operations for managing managers.
 * Contains endpoints for retrieving available managers and listing all managers.
 * 
 */

import { Request, Response } from 'express';
import Member from '../model/memberModel';

interface IManager {
  name: string;
  email: string;
  mobile: string;
  status: string;
}

/**
 * Retrieves all managers with a status of "AVAILABLE".
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of available managers or a message indicating no available managers.
 */
export const findAvailable = (req: Request, res: Response): void => {
  // Query the database for members with the specific status of "AVAILABLE"
  Member.find({ status: "AVAILABLE" })
    .exec()
    .then((response: any) => {
      // If no managers are found, return a message
      if (response.length === 0) {
        res.status(200).json({
          message: "No managers are Available",
        });
      } else {
        // Else: return the list of available managers
        res.status(200).json({
          response,
        });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

/**
 * Retrieves all managers, listing their names, emails, mobile numbers, and statuses.
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of all managers or a message prompting to add a managers if none are found.
 */
export const findAll = (req: Request, res: Response): void => {
  // Query the database for all members, selecting specific fields
  Member.find()
    .select("name email mobile status")
    .exec()
    .then((response: any) => {
      // If no managers are found, return a message
      if (response.length === 0) {
        res.status(200).json({
          message: "Add a manager",
        });
      } else {
        // Return the list of all managers
        res.status(200).json({
          response,
        });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};