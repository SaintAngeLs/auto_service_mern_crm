/**
 * @file accountServices.ts
 * 
 * @description Account Service Routes
 * 
 */

import express from 'express';
import { checkAuth } from '../middlewares/check-auth';
import * as AccountController from '../controllers/accountController';

const router = express.Router();

router.get(
  '/findAll',
  checkAuth.verifyToken,
  AccountController.getAllCustomers
);

router.get('/findCustById/:custId', AccountController.findCustById);

router.patch(
  '/updateProfile/:custId',
  [checkAuth.verifyToken, checkAuth.isCustomer],
  AccountController.updateProfile
);

router.delete(
  '/deleteAccount/:custId',
  [checkAuth.verifyToken, checkAuth.isCustomer],
  AccountController.deleteCustomer
);

export default router;
