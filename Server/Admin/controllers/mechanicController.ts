/**
 * @file mechanicController.ts
 * 
 * @description Provides operations for managing mechanics.
 * Contains endpoints for retrieving available mechanics and listing all mechanics.
 * 
 */

import { Request, Response } from 'express';
import Member from '../model/memberModel';

interface IMechanic {
  name: string;
  email: string;
  mobile: string;
  status: string;
}

/**
 * Retrieves all mechanics with a status of "AVAILABLE".
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of available mechanics or a message indicating no available mechanics.
 */
export const findAvailable = (req: Request, res: Response): void => {
  // Query the database for members with the specific status of "AVAILABLE"
  Member.find({ status: "AVAILABLE" })
    .exec()
    .then((response: any) => {
      // If no mechanics are found, return a message
      if (response.length === 0) {
        res.status(200).json({
          message: "No Mechanics are Available",
        });
      } else {
        // Else: return the list of available mechanics
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
 * Retrieves all mechanics, listing their names, emails, mobile numbers, and statuses.
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of all mechanics or a message prompting to add a mechanic if none are found.
 */
export const findAll = (req: Request, res: Response): void => {
  // Query the database for all members, selecting specific fields
  Member.find()
    .select("name email mobile status")
    .exec()
    .then((response: any) => {
      // If no mechanics are found, return a message
      if (response.length === 0) {
        res.status(200).json({
          message: "Add a Mechanic",
        });
      } else {
        // Return the list of all mechanics
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