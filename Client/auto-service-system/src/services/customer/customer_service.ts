/**
 * @file customer_service.ts
 * 
 * @description Service functions for customer operations related to car orders.
 * 
 */


import axios, { AxiosResponse } from 'axios';
import authHeader from './authentication/auth_header';

const ORDER_URL = 'http://localhost:8030/order/';
const CUST_ORDER = 'http://localhost:8080/customer/order/';

class CustomerService {
  /**
   * Places an order for a customer.
   * @param customerId Unique ID of the customer.
   * @param customerName Name of the customer.
   * @param carName Name of the car.
   * @param carNumber Number of the car.
   * @param custAddress Address of the customer.
   * @param serviceName Name of the service being ordered.
   * @param servicePrice Price of the service.
   */
  async placeOrder(
    customerId: string,
    customerName: string,
    carName: string,
    carNumber: string,
    custAddress: string,
    serviceName: string,
    servicePrice: number
  ): Promise<string> {
    try {
      const response: AxiosResponse = await axios.post(
        ORDER_URL + 'addOrder',
        {
          customerId,
          customerName,
          carName,
          carNumber,
          custAddress,
          serviceName,
          servicePrice,
        },
        {
          headers: authHeader(),
        }
      );
      return response.data.message;
    } catch (err) {
      console.error(err);
      return 'An error emenrged'
    }
  }

  /**
   * Fetches orders placed by a specific customer.
   * @param id ID of the customer.
   */
  async findMyOrders(id: string): Promise<any[]> {
    try {
      const response: AxiosResponse = await axios.get(CUST_ORDER + `findOrders/${id}`, {
        headers: authHeader(),
      });
      return response.data.orders;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  /**
   * Retrieves customer information based on customer ID.
   * @param id ID of the customer.
   */
  async findCustomerById(id: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(`http://localhost:8080/customer/account/findCustById/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}

const customerService = new CustomerService()
export default customerService;
