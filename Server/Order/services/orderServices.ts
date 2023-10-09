/**
 * @file orderServices.ts
 * 
 * @description API routes for order-related operations.
 * 
 */

import express from 'express';
import checkAuth from '../middlewares/check-auth';
import * as OrderController from '../controllers/ordersController';

const router = express.Router();

// Route to add an order with authentication middleware in place
router.post("/addOrder", [checkAuth.verifyToken], OrderController.addOrder);

// Route to fetch all completed orders
router.get("/findCompletedOrders", OrderController.findCompletedOrders);

export default router;
