/**
 * @file accountController.ts
 * 
 * @description Controllers for managing customer accounts.
 * 
 */

import { Request, Response } from 'express';
import Customer from '../model/customerModel';

/**
 * Update customer's profile.
 *
 * @param {Request} req: Express request object.
 * @param {Response} res: Express response object.
 */
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.custId;
    const response = await Customer.updateOne({ _id: id }, { $set: req.body }).exec();
    console.log(`Profile Updated Successfully: ${response}`);
    res.status(200).json({
      message: 'Profile Updated Successfully',
      response,
    });
  } catch (err) {
    console.error(`Profile Update error: ${err}`);
    res.status(500).json({ error: `Profile Update error: ${err}` });
  }
};

/**
 * Retrieve all customers.
 *
 * @param {Request} req: Express request object.
 * @param {Response} res: Express response object.
 */
export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await Customer.find().select('name email _id').exec();
    const response = {
      count: results.length,
      products: results.map(result => ({
        name: result.name,
        email: result.email,
        _id: result._id,
        request: {
          type: 'GET',
          url: `http://localhost:8080/customer/account/findCustById/${result._id}`,
        },
      })),
    };

    results.length > 0 ? res.status(200).json(response) : res.status(200).json('Empty List');
  } catch (err) {
    console.error(`Get All Customers Error: ${err}`);
    res.status(500).json({ error: err });
  }
};

/**
 * Retrieve a customer by their ID.
 *
 * @param {Request} req: Express request object.
 * @param {Response} res: Express response object.
 */
export const findCustById = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Customer.findById({ _id: req.params.custId }).select('name email _id').exec();
    result
      ? res.status(200).json({
          name: result.name,
          email: result.email,
          _id: result._id,
        })
      : res.status(404).json({ message: 'Invalid Id' });
  } catch (err) {
    console.error(`Find Customer By Id Error: ${err}`);
    res.status(500).json({ error: err });
  }
};

/**
 * Delete a customer by their ID.
 *
 * @param {Request} req: Express request object.
 * @param {Response} res: Express response object.
 */
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    await Customer.deleteOne({ _id: req.params.custId }).exec();
    res.status(200).json({ message: 'Account deleted Successfully' });
  } catch (err) {
    console.error(`Delete Customer Error: ${err}`);
    res.status(500).json({ error: err });
  }
};
