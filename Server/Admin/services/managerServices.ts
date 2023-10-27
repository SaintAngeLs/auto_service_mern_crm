/**
 * @file managerServices.ts
 * 
 * Routes for manager-related operations.
 */

import express from 'express';
// Middleware for authentication and manager controller
import * as ManagerController from '../controllers/managerController';
import * as checkAuth from '../middlewares/check-auth';

const router = express.Router();

// Define routes for finding available managers and all managers
// These routes are protected and accessible by admins only

// Route to find available managers, accessible only by the ADMIN
router.get("/findAvailable", [checkAuth.verifyToken, checkAuth.isAdmin], ManagerController.findAvailable);

// Route to find all managers, accessible only by the ADMIN
router.get("/findAll", [checkAuth.verifyToken, checkAuth.isAdmin], ManagerController.findAll);

// Export the router for use in external app
export default router;