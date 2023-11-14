/**
 * @file car_service.ts
 * 
 * @description This file contains the service functions for handling car packages.
 * 
 */

import axios, { AxiosResponse } from 'axios';
import authHeader from '../auth_header';

const API_URL = 'http://localhost:8010/admin/car-services/';

class PackageService {
  /**
   * Fetch all services.
   */
  getAllServices(): Promise<any> {
    return axios
      .get(API_URL + 'findAll')
      .then((response: AxiosResponse) => {
        return response.data.service;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }

  /**
   * Add a new service.
   */
  addService(
    serviceType: string,
    name: string,
    price: number,
    description: string,
    timeRequired: string,
    where: string
  ): Promise<string> {
    return axios
      .post(
        API_URL + 'addService',
        { serviceType, name, price, description, timeRequired, where },
        {
          headers: authHeader(),
        }
      )
      .then((res: AxiosResponse) => {
        return res.data.message;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }

  /**
   * Update an existing service by ID.
   */
  updateService(
    id: string,
    serviceType: string,
    name: string,
    price: number,
    description: string,
    timeRequired: string,
    where: string
  ): Promise<string> {
    return axios
      .patch(
        API_URL + `updateService/${id}`,
        { id, serviceType, name, price, description, timeRequired, where },
        {
          headers: authHeader(),
        }
      )
      .then((res: AxiosResponse) => {
        return res.data.message;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }

  /**
   * Delete a service by its ID.
   * @function
   * 
   * @param id: the ID of the rervice to delete
   */
  deleteService(id: string): Promise<string> {
    return axios
      .delete(API_URL + `deleteService/${id}`, {
        headers: authHeader(),
      })
      .then((res: AxiosResponse) => {
        return res.data.status;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }

  /**
   * Find a service by its ID.
   * @function
   * @void
   */
  findServiceById(id: string): Promise<any> {
    return axios
      .get(API_URL + `findById/${id}`)
      .then((res: AxiosResponse) => {
        return res.data.response;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }
}


const packageService = new PackageService();
export default packageService;
