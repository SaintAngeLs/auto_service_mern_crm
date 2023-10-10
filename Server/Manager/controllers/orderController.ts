/**
 * @file car_service.ts
 * 
 * @description Functions related to order and member operations in a car service system
 * 
 */

import { Request, Response } from 'express';
import OrderModel from '../model/orderModel';
import MemberModel from '../model/memberModel';

/**
 * Finds orders that are either in IN-PROCESS or ACCEPTED status for a specific mechanic.
 * @param req Express request object containing the mechanic ID in the parameters.
 * @param res Express response object used to send responses to the client.
 */
export const findInProcessOrders = (req: Request, res: Response): void => {
  OrderModel.find({
    $or: [
      { mechanicId: req.params.mechId, status: "IN-PROCESS" },
      { mechanicId: req.params.mechId, status: "ACCEPTED" },
    ],
  })
    .exec()
    .then((response: any[]) => { // Replace `any` with the appropriate type of your order model.
      if (response.length === 0) {
        res.status(200).json({ message: "No Orders are available" });
      } else {
        res.status(200).json({ orders: response });
      }
    })
    .catch((err: Error) => {
      console.error("Find All Placed Orders Error:", err.message);
      res.status(500).json({ error: err.message });
    });
};

/**
 * Updates the status of an order. If an order is accepted, the mechanic's availability status is also updated.
 * @param req Express request object containing the order ID in the parameters and the new status in the body.
 * @param res Express response object used to send responses to the client.
 */
export const updateOrder = (req: Request, res: Response): void => {
  OrderModel.updateOne({ _id: req.params.orderId }, { $set: { status: req.body.status } })
    .exec()
    .then(() => {
      return OrderModel.findOne({ _id: req.params.orderId }).exec();
    })
    .then((obj: any) => { // Replace `any` with the appropriate type of your order model.
      const mechId = obj.mechanicId;
      console.log("Mechanic Id:", mechId);

      const statusUpdate = req.body.status === "ACCEPTED" ? "NOT AVAILABLE" : "AVAILABLE";
      
      return MemberModel.updateOne({ _id: obj.mechanicId }, { $set: { status: statusUpdate } }).exec();
    })
    .then(() => {
      console.log("Order Updated Successfully");
      res.status(200).json({ message: "Request Updated Successfully" });
    })
    .catch((err: Error) => {
      console.error("Order Update Error:", err.message);
      res.status(500).json({ "Order Update Error": err.message });
    });
};

/**
 * Finds orders for a specific mechanic.
 * @param req Express request object containing the mechanic ID in the parameters.
 * @param res Express response object used to send responses to the client.
 */
export const findMyOrders = (req: Request, res: Response): void => {
  OrderModel.find({ mechanicId: req.params.mechId })
    .exec()
    .then((response: any[]) => { // Replace `any` with the appropriate type of your order model.
      if (response.length === 0) {
        res.status(200).json({ message: "No Orders are available" });
      } else {
        res.status(200).json({ orders: response });
      }
    })
    .catch((err: Error) => {
      console.error("Find All Orders Error:", err.message);
      res.status(500).json({ error: err.message });
    });
};
