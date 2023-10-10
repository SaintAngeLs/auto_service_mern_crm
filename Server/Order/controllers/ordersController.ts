/**
 * @file orderControllers.ts
 * 
 * @description Order controllers for managing order-related operations.
 * 
 */

import { Request, Response } from 'express';
import Order from '../model/orderModel';

// To place an Order
export const addOrder = (req: Request, res: Response) => {
  const order = new Order({
    ...req.body
  });

  order.save()
    .then(result => {
      console.log(`Order Placed: ${result}`);
      res.status(201).json({
        message: "Thank you for your order.",
        result
      });
    })
    .catch(err => {
      console.log(`Placing Order Error: ${err}`);
      res.status(500).json({
        error: err
      });
    });
};

// Find Completed Orders
export const findCompletedOrders = (req: Request, res: Response) => {
  Order.find({ status: "COMPLETED" })
    .exec()
    .then((response: Array<any>) => {
      if (!response.length) {
        res.status(200).json({
          message: "No Orders are available"
        });
      } else {
        res.status(200).json({
          orders: response
        });
      }
    })
    .catch((err: Error) => {
      console.log(`Find All Completed Orders Error: ${err}`);
      res.status(500).json({
        error: err
      });
    });
};
