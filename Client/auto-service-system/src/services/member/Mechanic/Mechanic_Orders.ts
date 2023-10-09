/**
 * @file Mechanic_Orders.ts
 * 
 * @description Service functions to interact with mechanic orders API.
 * 
 */

import axios, { AxiosResponse } from 'axios';
import mechHeader from '../mech_header';

const API_URL = 'http://localhost:8020/mechanic/orders/';

class MechanicOrders {

  /**
   * @function
   * 
   * Retrieve orders that are currently in process for a given mechanic.
   * @param mechId Mechanic's ID.
   */
  getInProcessOrders(mechId: string): Promise<any> {
    console.log("Method: " + mechId);
    return axios
      .get(API_URL + `findInProcessOrders/${mechId}`, {
        headers: mechHeader(),
      })
      .then((res: AxiosResponse) => {
        return res.data.orders;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }

  /**
   * @function
   * 
   * Update the status of a given order.
   * @param orderId The ID of the order to update.
   * @param status The new status for the order.
   */
  updateOrder(orderId: string, status: string): Promise<string> {
    return axios
      .patch(
        API_URL + `updateOrder/${orderId}`,
        {
          status,
        },
        {
          headers: mechHeader(),
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
   * @function
   * 
   * Retrieve all orders for a given mechanic.
   * @param mechId Mechanic's ID.
   */
  getAllOrders(mechId: string): Promise<any> {
    return axios
      .get(API_URL + `findMyOrders/${mechId}`, {
        headers: mechHeader(),
      })
      .then((res: AxiosResponse) => {
        return res.data.orders;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }
}

export default new MechanicOrders();
