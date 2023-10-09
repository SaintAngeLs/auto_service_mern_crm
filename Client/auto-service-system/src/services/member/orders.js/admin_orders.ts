/**
 * @file admin_orders.ts
 * 
 * @description Service functions for the Admin Orders API endpoints.
 * 
 */

import axios, { AxiosResponse } from 'axios';
import authHeader from '../auth_header';

const ORDER_URL = 'http://localhost:8010/admin/order/';
const COMPLETED_ORDERS_URL = 'http://localhost:8030/order/';

class AdminOrders {
  /**
   * Fetch placed orders.
   */
  findPlacedOrders(): Promise<any> {
    return axios
      .get(ORDER_URL + 'findPlacedOrder', { headers: authHeader() })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        return res.data.orders;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }

  /**
   * Assigns an order to a mechanic by the order ID and mechanic ID.
   * @param orderId The order's ID.
   * @param mechanicId The mechanic's ID.
   */
  assignOrder(orderId: string, mechanicId: string): Promise<string> {
    return axios
      .patch(
        ORDER_URL + `updateOrder/${orderId}`,
        { mechanicId },
        { headers: authHeader() }
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
   * Fetch completed orders.
   */
  findCompletedOrders(): Promise<any> {
    return axios
      .get(COMPLETED_ORDERS_URL + 'findCompletedOrders')
      .then((res: AxiosResponse) => {
        return res.data.orders;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }
}

export default new AdminOrders();
