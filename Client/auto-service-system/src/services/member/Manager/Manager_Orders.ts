/**
 * @file Manager_Orders.ts
 * 
 * @description Service functions to interact with manager orders API.
 * 
 */

import axios, { AxiosResponse } from 'axios';
import managerHeader from '../manager_header';

const API_URL = 'http://localhost:8020/manager/orders/';

class ManagerOrders {

  /**
   * @function
   * 
   * Retrieve orders that are currently in process for a given manager.
   * @param managerId Manager's ID.
   */
  getInProcessOrders(managerId: string): Promise<any> {
    console.log("Method: " + managerId);
    return axios
      .get(API_URL + `findInProcessOrders/${managerId}`, {
        headers: managerHeader(),
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
          headers: managerHeader(),
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
   * Retrieve all orders for a given manager.
   * @param thisManagerId Manager's ID.
   */
  getAllOrders(thisManagerId: string): Promise<any> {
    return axios
      .get(API_URL + `findMyOrders/${thisManagerId}`, {
        headers: managerHeader(),
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

export default new ManagerOrders();
