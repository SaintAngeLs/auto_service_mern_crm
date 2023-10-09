/**
 * @file orderServices.ts
 * 
 * @description Order Service Routes
 * 
 */

import express from 'express';
import { checkAuth } from '../middlewares/check-auth';
import * as UsersController from '../controllers/authController';

const router = express.Router();

router.get('/allAccess', (req: any, res: any) => {
  res.status(200).send('Public Content.');
});

router.get(
  '/customerAccess',
  [checkAuth.verifyToken, checkAuth.isCustomer],
  (req: any, res: any) => {
    res.status(200).send('Customer Content.');
  }
);

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

export default router;
