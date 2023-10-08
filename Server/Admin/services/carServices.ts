/**
 * @file carServices.ts
 * 
 * Routes for car-related operations.
 */

import express from 'express';
// Middleware for authentication and car controller
import * as CarController from '../controllers/carController';
import * as checkAuth from '../middlewares/check-auth';

const router = express.Router();

// Define various routes for car-related operations
// Some operations are protected to be accessed by admins only

// Route to add a car, accessed only by admin
router.post("/addCar", [checkAuth.verifyToken, checkAuth.isAdmin], CarController.addCar);

// Route to find all the cars
router.get("/findAll", CarController.findAllCars);

// Route to find all the models of the cars
router.get("/findAllBrands", CarController.findAllBrands);

// Route to find the car by the brand
router.post("/findByBrand", CarController.findByBrand);

// Route to find the car by ID
router.get("/findByCar/:carId", CarController.findByCarId);

// Route to update the car (related to finding by ID), accessed only by the user with the role of ADMIN
router.patch("/updateCar/:id", [checkAuth.verifyToken, checkAuth.isAdmin], CarController.updateCar);

// Route to delete the car (related to finding by ID), accessed only by the user with the role of ADMIN
router.delete("/deleteCar/:carId", [checkAuth.verifyToken, checkAuth.isAdmin], CarController.deleteCar);

// Export the router for use in external app
export default router;
