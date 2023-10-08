/**
 * @file managerServices.ts
 * 
 * Routes for manager-related operations.
 */

import express from 'express';
// Middleware for authentication and mechanic controller
import * as MechanicController from '../controllers/mechanicController';
import * as checkAuth from '../middlewares/check-auth';

const router = express.Router();

// Define routes for finding available managers and all managers
// These routes are protected and accessible by admins only

// Route to find available mechanics, accessible only by the ADMIN
router.get("/findAvailable", [checkAuth.verifyToken, checkAuth.isAdmin], MechanicController.findAvailable);

// Route to find all mechanics, accessible only by the ADMIN
router.get("/findAll", [checkAuth.verifyToken, checkAuth.isAdmin], MechanicController.findAll);

// Export the router for use in external app
export default router;