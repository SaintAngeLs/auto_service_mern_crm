/**
 * @file car_service.ts
 * 
 * @description Service functions for car-related operations.
 * 
 */

import axios, { AxiosResponse } from 'axios';
import authHeader from '../auth_header';

const API_URL = 'http://localhost:8088/admin/car-func/';

class CarService {
  /**
   * Fetches all car brands.
   */
  async getAllBrands(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(API_URL + 'findAllBrands', { headers: authHeader() });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Fetches cars by a given brand.
   * @param brand Brand of the car.
   */
  async getCarsByBrand(brand: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(API_URL + 'findByBrand', { brand }, { headers: authHeader() });
      return response.data.cars;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Fetches all cars.
   */
  async getAllCars(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(API_URL + 'findAll', { headers: authHeader() });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Adds a new car.
   * @param name Name of the car.
   * @param brand Brand of the car.
   */
  async addCar(name: string, brand: string): Promise<string> {
    try {
      const response: AxiosResponse = await axios.post(
        API_URL + 'addCar',
        { name, brand },
        { headers: authHeader() }
      );
      return response.data.message;
    } catch (err) {
      console.error(err);
      return "The error emerged in the addCar";
    }
  }

  /**
   * Deletes a car by ID.
   * @param carId ID of the car.
   */
  async deleteCar(carId: string): Promise<string> {
    try {
      const response: AxiosResponse = await axios.delete(API_URL + `deleteCar/${carId}`, {
        headers: authHeader(),
      });
      return response.data.message;
    } catch (err) {
      console.error(err);
      return "The error emerged in the deleteCar";
    }
  }

  /**
   * Updates a car's brand by ID.
   * @param carId ID of the car.
   * @param brand New brand of the car.
   */
  async updateCar(carId: string, brand: string): Promise<string> {
    try {
      const response: AxiosResponse = await axios.patch(
        API_URL + `updateCar/${carId}`,
        { brand },
        { headers: authHeader() }
      );
      return response.data.message;
    } catch (err) {
      console.error(err);
      return "The error emerged in the updateCar";
    }
  }

  /**
   * Fetches a car by its ID.
   * @param carId ID of the car.
   */
  async findCarById(carId: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(API_URL + `findByCar/${carId}`, { headers: authHeader() });
      return response.data.response;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new CarService();
