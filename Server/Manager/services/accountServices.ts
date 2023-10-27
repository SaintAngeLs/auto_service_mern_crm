/**
 * @file accountServices.ts
 * 
 * @description Routes related to account services.
 * 
 */

import express from "express";
import checkAuth from "../middlewares/check-auth";
import * as AccountController from "../controllers/accountController";

const router = express.Router();

router.patch(
  "/update/:thisManagerId",
  [checkAuth.verifyToken],
  AccountController.updateProfile
);

router.delete(
  "/delete/:thisManagerId",
  [checkAuth.verifyToken],
  AccountController.deleteProfile
);

export default router;
