/**
 * @file account_controller.ts
 * 
 * @description Contains functions related to car service operations
 * 
 */

import { Request, Response } from 'express'; // Assuming you're using Express.js
import MemberModel from '../model/memberModel';

// To provide a specific type for the request parameter, you'll need more information on the shape of the request. For now, I'll just use the built-in types from Express (Request and Response).

/**
 * Updates the profile of a member.
 * @param {Request} req - Express request object containing the details to be updated.
 * @param {Response} res - Express response object used to send responses to the client.
 */
export const updateProfile = (req: Request, res: Response): void => {
  const id: string = req.params.thisManagerId;
  
  MemberModel.updateMany({ _id: id }, { $set: req.body })
    .exec()
    .then((response: any) => {  // The type 'any' is used as a placeholder. You should replace it with the appropriate type based on the Mongoose model's response.
      console.log("Profile Updated Successfully: " + response);
      res.status(200).json({
        message: "Profile Updated Successfully",
        response,
      });
    })
    .catch((err: Error) => {
      console.log("Profile Update error: " + err.message);
      res.status(500).json({ "Profile Update error": err.message });
    });
};

/**
 * Deletes the profile of a member.
 * @param {Request} req - Express request object containing the member ID to be deleted.
 * @param {Response} res - Express response object used to send responses to the client.
 */
export const deleteProfile = (req: Request, res: Response): void => {
  const id: string = req.params.thisManagerId;

  MemberModel.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Account Deleted",
      });
    })
    .catch((err: Error) => {
      console.log("Account Delete error: " + err.message);
      res.status(500).json({ "Account Delete error": err.message });
    });
};
