/**
 * @file carController.ts
 * 
 * @description Provides operations of the CRUD operation set for car management.
 * Contains endpoints for adding, updating, deleting, and retrieving cars and their brands.
 * 
 */

import { Request, Response } from 'express';
import CarModel from '../model/carModel';

interface CarInput {
    name: string;
    brand: string;
}


/**
 * Adds a new car to the database.
 * 
 * @param {Object} req: express request object with car details (name, brand).
 * @param {Object} res: express response object.
 * 
 * @returns {Object} JSON response indicating the outcome of the addition.
 */
export const addCar = async (req: Request, res: Response): Promise<void> => {
  try {
      const carInput: CarInput = req.body;

      const existingCar = await CarModel.findOne({ name: carInput.name }).exec();

      if (existingCar) {
          res.status(409).json({ message: "Name Already Exist" });
      } else {
          const car = new CarModel(carInput);
          const savedCar = await car.save();

          console.log("Car Added:", savedCar);
          res.status(201).json({
              message: "Car Added Successfully",
              car: {
                  brand: savedCar.brand,
                  name: savedCar.name,
                  _id: savedCar._id,
              },
          });
      }
  } catch (err) {
      console.log("Add Car Error:", err);
      res.status(500).json({ error: err });
  }
};


/**
 * Retrieves all cars from the database.
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of cars or message indicating no cars available.
 */
export const findAllCars = async (req: Request, res: Response): Promise<void> => {
    try {
        const cars = await CarModel.find().select("_id name brand").exec();

        if (cars.length === 0) {
            res.status(200).json({ message: "No Cars Available" });
        } else {
            res.send(cars);
        }
    } catch (err) {
        console.log("Find All Cars Method Error:", err);
        res.status(500).json({ error: err });
    }
};


/**
 * Retrieves all unique car brands from the database.
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of brands or message indicating no brands available.
 */
export const findAllBrands = async (req: Request, res: Response): Promise<void> => {
  try {
      const brands = await CarModel.find().distinct("brand").exec();

      if (brands.length === 0) {
          res.status(200).json({ message: "No Brands Available" });
      } else {
          res.send(brands);
      }
  } catch (err) {
      console.log("Find All Brand Method Error:", err);
      res.status(500).json({ error: err });
  }
};


/**
 * Retrieves all cars of a specific brand from the database.
 * 
 * @param {Object} req: Express request object with the desired brand.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of cars or a message indicating the brand is not available.
 */
export const findByBrand = async (req: Request, res: Response): Promise<void> => {
  try {
      const cars = await CarModel.find({ brand: req.body.brand }).select("name").exec();

      if (cars.length < 1) {
          res.status(404).json({ message: "This Brand is Not available" });
      } else {
          res.status(200).json({
              cars: cars.map(car => ({ name: car.name, _id: car._id })),
          });
      }
  } catch (err) {
      console.log("Find By Brand Error:", err);
      res.status(500).json({ error: err });
  }
};


/**
 * Retrieves a specific car using its ID (finding byt the name for the case of the user).
 * 
 * @param {Object} req: Express request object with the car's ID.
 * @param {Object} res: Express response object.
 * 
 * @returns {Object} JSON object of the car or a message indicating the car is not available.
 */
export const findByCarId = async (req: Request, res: Response): Promise<void> => {
    const carId = req.params.carId;
    try {
        const car = await CarModel.findById(carId).exec();
  
        if (!car) {
            res.status(404).json({ message: "Car not found" });
        } else {
            res.status(200).json(car);
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            res.status(400).json({ message: "Invalid car ID" });
        } else {
            res.status(500).json({ error: "An error occurred while retrieving the car" });
        }
    }
};


/**
 * Updates the details of a specific car.
 * 
 * @param {Object} req: Express request object with the updated car details.
 * @param {Object} res: Express response object.
 * 
 * @returns {Object} JSON response indicating the outcome of the update.
 */
export const updateCar = async (req: Request, res: Response): Promise<void> => {
    const carId = req.params.carId;
    try {
        const result = await CarModel.findByIdAndUpdate(carId, req.body, { new: true }).exec();

        if (!result) {
            res.status(404).json({ message: "Car not found or no update made" });
        } else {
            res.status(200).json({ message: "Car updated successfully", car: result });
        }
    } catch (err: any) {
        if (err.name === 'CastError') {
            res.status(400).json({ message: "Invalid car ID" });
        } else {
            res.status(500).json({ error: "An error occurred while updating the car" });
        }
    }
};


/**
 * Deletes a specific car using its ID.
 * 
 * @param {Object} req: Express request object with the car's ID.
 * @param {Object} res: Express response object.
 * 
 * @returns {Object} JSON response indicating the outcome of the deletion.
 */
export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
      await CarModel.deleteOne({ _id: req.params.carId }).exec();
      res.status(200).json({ message: "Car deleted Successfully" });
  } catch (err) {
      console.log("Delete Car:", err);
      res.status(500).json({ error: err });
  }
};
