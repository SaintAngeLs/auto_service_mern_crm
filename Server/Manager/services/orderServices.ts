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
  [checkAuth.verifyToken, checkAuth.isManager],
  OrderController.updateOrder
);

router.get(
  "/findInProcessOrders/:thisManagerId",
  [checkAuth.verifyToken, checkAuth.isManager],
  OrderController.findInProcessOrders
);

router.get(
  "/findMyOrders/:thisManagerId",
  [checkAuth.verifyToken, checkAuth.isManager],
  OrderController.findMyOrders
);

export default router;