/**
 * @file orderServices.ts
 * 
 * @description Routes related to order services.
 * 
 */

import express from "express";
import checkAuth from "../middlewares/check-auth";
import * as OrderController from "../controllers/orderController";

const router = express.Router();

router.patch(
  "/updateOrder/:orderId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.updateOrder
);

router.get(
  "/findInProcessOrders/:mechId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.findInProcessOrders
);

router.get(
  "/findMyOrders/:mechId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.findMyOrders
);

export default router;