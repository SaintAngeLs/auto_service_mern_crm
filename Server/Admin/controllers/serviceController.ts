/**
 * @file serviceController.ts
 * 
 * @description Provides CRUD operations for managing services.
 * 
 */

import { Request, Response } from 'express';
import ServiceModel from '../model/serviceModel';


interface IService {
  serviceType: string;
  name: string;
  price: number;
  description: string;
  timeRequired: string;
  where: string;
  // {... any other properties associated with services}
}


/**
 * Add a new service to the database.
 * Checks if a service with the provided name exists, if not, creates a new service.
 * 
 * @function
 * 
 * @param {Object} req: Express request object. Contains the service data in the body.
 * @param {Object} res: Express response object.
 * 
 * @returns {Object} JSON response indicating successful creation or a conflict.
 */
export const addService = (req: Request, res: Response): void => {
  ServiceModel.findOne({ name: req.body.name })
    .exec()
    .then((response: IService | null) => {
      if (response) {
        res.status(409).json({
          message: "Entered Service Name is Already Exist",
        });
      } else {
        const service = new ServiceModel({
          serviceType: req.body.serviceType,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          timeRequired: req.body.timeRequired,
          where: req.body.where,
        });

        service.save().then((response: IService) => {
          console.log("Service Added: ", response);
          res.status(201).json({
            message: "Service Added Successfully",
          });
        });
      }
    })
    .catch((err: any) => {
      console.log("Add Service Error: ", err);
      res.status(500).json({
        error: err,
      });
    });
};


/**
 * Retrieve all available services from the database.
 * 
 * @function
 * 
 * @param {Object} req: Express request object.
 * @param {Object} res: Express response object.
 * 
 * @returns {Array|Object} JSON array of services or a message indicating no services.
 */
export const findAll = (req: Request, res: Response): void => {
  ServiceModel.find()
    .select("-__v")
    .exec()
    .then((response: IService[]) => {
      if (response.length === 0) {
        res.status(200).json({
          message: "No Services Available at this Time",
        });
      } else {
        res.status(200).json({
          service: response,
        });
      }
    })
    .catch((err: any) => {
      console.log("Find All Method Error: ", err);
      res.status(500).json({
        error: err,
      });
    });
};


/**
 * Update a specific service by its ID.
 * 
 * @function
 * 
 * @param {Object} req: Express request object. Contains the updated service data in the body 
 * and the serviceId in parameters.
 * @param {Object} res: Express response object.
 * 
 * @returns {Object} JSON response indicating successful update or an error message.
 */
export const updateService = (req: Request, res: Response): void => {
  const id = req.params.serviceId;

  ServiceModel.updateMany({ _id: id }, { $set: req.body })
    .exec()
    .then((response: any) => {
      console.log("Updated Service Successfully: ", response);
      res.status(200).json({
        message: "Service Updated Successfully",
      });
    })
    .catch((err: any) => {
      console.log("Service Update Error: ", err);
      res.status(500).json({ "Service Update Error": err });
    });
};


/**
 * Delete a specific service by its ID.
 * 
 * @function
 * 
 * @param {Object} req: Express request object. Contains the serviceId in parameters.
 * @param {Object} res: Express response object.
 * 
 * @returns {Object} JSON response indicating successful deletion or an error message.
 */
export const deleteService = (req: Request, res: Response): void => {
  const id = req.params.serviceId;

  ServiceModel.deleteOne({ _id: id })
    .exec()
    .then((result: any) => {
      res.status(200).json({
        status: "Service Deleted Successfully",
      });
    })
    .catch((err: any) => {
      console.log("Service Delete Error: ", err);
      res.status(500).json({
        error: err,
      });
    });
};


/**
 * Retrieve a specific service by its ID.
 * 
 * @function
 * 
 * @param {Object} req: Express request object. Contains the serviceId in parameters.
 * @param {Object} res: Express response object.
 * 
 * @returns {Object} JSON representation of the service or a message indicating it's not found.
 */
export const findByServiceId = (req: Request, res: Response): void => {
  ServiceModel.findOne({ _id: req.params.serviceId })
    .exec()
    .then((response: IService | null) => {
      if (!response) {
        res.status(404).json({
          message: "This Service is Not available",
        });
      } else {
        res.status(200).json({
          response,
        });
      }
    })
    .catch((err: any) => {
      console.log("Find By Service Error: ", err);
      res.status(500).json({
        error: err,
      });
    });
};