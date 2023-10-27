/**
 * @file orderServices.ts
 * 
 * Routes for order-related operations.
 */

import express from 'express';
// Middleware for authentication and manager controller
import * as OrderController from '../controllers/orderController';
import * as checkAuth from '../middlewares/check-auth';

const router = express.Router();

// Define routes for finding placed orders and updating an order
// These routes are protected and only accessible by admins

// Route to find the placed order, accessible only by the admins
router.get("/findPlacedOrder", [checkAuth.verifyToken, checkAuth.isAdmin], OrderController.findPlacedOrders);

// Route to update the order according to access it by its ID, accessible only by the user with the role of ADMIN
router.patch("/updateOrder/:orderId", [checkAuth.verifyToken, checkAuth.isAdmin], OrderController.updateOrder);

// Export the router to use in the external space
export default router;