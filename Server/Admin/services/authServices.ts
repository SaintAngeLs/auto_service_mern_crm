/**
 * @file autoService.ts
 * 
 * Routes for authentication services.
 */

import express from 'express';
import * as AuthController from '../controllers/authController';

const router = express.Router();

// Routing for user login
router.post("/login", AuthController.login);

// Routing for the user registration
router.post("/register", AuthController.register);

// Export the router for use in external app
export default router;
