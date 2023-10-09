/**
 * @file mechanic_service.ts
 * 
 * @description Service functions for the Mechanic API endpoints.
 * 
 */

import axios, { AxiosResponse } from 'axios';
import mechHeader from '../mech_header';
import authHeader from '../auth_header';

const API_URL = 'http://localhost:8010/admin/mechanic/';
const ACC_URL = 'http://localhost:8020/mechanic/account/';

class MechanicService {
  /**
   * Fetch all mechanics.
   */
  findAll(): Promise<any> {
    return axios
      .get(API_URL + 'findAll', {
        headers: authHeader(),
      })
      .then((res: AxiosResponse) => {
        return res.data.response;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }

  /**
   * @function
   * 
   * Delete a mechanic's account by ID.
   * @param id The mechanic's ID.
   * 
   * @void
   */
  deleteAccount(id: string): Promise<string> {
    return axios
      .delete(ACC_URL + `delete/${id}`, {
        headers: authHeader(),
      })
      .then((res: AxiosResponse) => {
        console.log(res);
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
   * Fetch all available mechanics.
   * @void
   */
  findAvailable(): Promise<any> {
    return axios
      .get(API_URL + 'findAvailable', {
        headers: authHeader(),
      })
      .then((res: AxiosResponse) => {
        return res.data.response;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }
}

export default new MechanicService();
