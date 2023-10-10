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
  "/update/:mechId",
  [checkAuth.verifyToken],
  AccountController.updateProfile
);

router.delete(
  "/delete/:mechId",
  [checkAuth.verifyToken],
  AccountController.deleteProfile
);

export default router;
