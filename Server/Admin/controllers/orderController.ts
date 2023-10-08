/**
 * @file orderController.ts
 * 
 * @description Provides operations for managing orders.
 * Contains endpoints for retrieving placed orders and updating order status.
 * 
 */

import { Request, Response } from 'express';
import OrderModel from '../model/orderModel';
import MemberModel from '../model/memberModel'; // Assuming you have a TypeScript version of memberModel
import CustomerModel from '../model/customerModel'; // Assuming you have a TypeScript version of customerModel

interface IOrder {
  status: string;
  mechanicId?: string;
  // any other properties associated with orders
}

// Maybe let's use this interface ib the future better times of dummy reality...
interface UpdateResult {
  n?: number;
  nModified?: number;
  ok?: number;
  // ... possibly other fields
}

/**
 * Retrieves all orders with a status of "PLACED".
 * 
 * @function
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of placed orders or a message indicating no available placed orders.
 */
export const findPlacedOrders = (req: Request, res: Response): void => {
  // Query the database for specific orders with the status of "PLACED"
  OrderModel.find({ status: "PLACED" })
    .exec()
    .then((response: any) => {
      // If no orders are found with the "PLACED" status, return a message telling it
      if (response.length === 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        // Else: return the list of placed orders
        res.status(200).json({
          orders: response,
        });
      }
    })
    .catch((err: Error) => {
      console.log("Find All Placed Orders Error: " + err.message);
      res.status(500).json({
        error: err.message,
      });
    });
};

/**
 * Update an order's status to "IN-PROCESS" and assign it to a mechanic.
 * 
 * @function
 * 
 * @param {Object} req: Express request object. Contains orderId in parameters and mechanicId in the body.
 * @param {Object} res: Express response object.
 * 
 * @returns {Object} JSON response indicating successful assignment or an error message.
 */
export const updateOrder = (req: Request, res: Response): void => {
  const orderId: string = req.params.orderId;

  // Update the order in the database using the provided orderId.
  // Set its status to "IN-PROCESS" and assign the mechanicId from the request body.

  OrderModel.updateOne(
    { _id: orderId },
    { $set: { status: "IN-PROCESS", mechanicId: req.body.mechanicId } }
  )
    .exec()
    .then((response: any) => { // Using UpdateResult
      if (response.nModified && response.nModified > 0) {
        res.status(200).json({
          message: "Order Successfully Assigned to Mechanic",
        });
      } else {
        res.status(404).json({
          message: "Order not found or not modified",
        });
      }
    })
    .catch((err: Error) => {
      console.log(err.message);
      res.status(500).json({
        error: err.message,
      });
    });
};
