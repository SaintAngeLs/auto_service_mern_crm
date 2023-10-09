/**
 * @file orderController.ts
 * 
 * @description Controller for order related operations.
 */

import { Request, Response, NextFunction } from 'express';
import Order from '../model/orderModel';

/**
 * Fetches the orders for a specific customer.
 * 
 * @param {Request} req - Express request object. Expected to contain a customerId in params.
 * @param {Response} res - Express response object.
 */
export const findMyOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find({ customerId: req.params.customerId }).exec();

        if (orders.length === 0) {
            res.status(200).json({
                message: 'No Orders',
            });
        } else {
            res.status(200).json({
                orders: orders,
            });
        }
    } catch (err) {
        console.error(`Find My Orders Error: ${err}`);
        res.status(500).json({
            error: err,
        });
    }
};
