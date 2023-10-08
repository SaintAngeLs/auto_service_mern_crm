/**
 * @file autoWashServices.ts
 * 
 * Routes for auto wash services.
 */

import express from 'express';
// Middleware for the authentication and controllers
import * as ServiceController from '../controllers/serviceController';
import * as checkAuth from '../middlewares/check-auth';

const router = express.Router();




// Routes for adding, finding, updating, and deleting services
// Some routes are orotected and may only be accessed only by the user with the role of ADMIN

// Route to add the Service for a specific car, accessible only by the user with the role of ADMIN.
router.post("/addService", [checkAuth.verifyToken, checkAuth.isAdmin], ServiceController.addService);

// Route to find all the cars.
router.get("/findAll", ServiceController.findAll);

// Route to find a service by its ID.
router.get("/findById/:serviceId", ServiceController.findByServiceId);

// Route to update a service, accessible only for the ADMIN.
router.patch("/updateService/:serviceId", [checkAuth.verifyToken, checkAuth.isAdmin], ServiceController.updateService);

// Route to delete a service, accessible only for the ADMIN.
router.delete("/deleteService/:serviceId", [checkAuth.verifyToken, checkAuth.isAdmin], ServiceController.deleteService);

// Export the router for use in external applications.
export default router;