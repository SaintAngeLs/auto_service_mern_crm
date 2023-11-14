/**
 * @file Manager_Services.ts
 * 
 * @description Service functions for the Manager API endpoints.
 * 
 */

import axios, { AxiosResponse } from 'axios';
import managerHeader from '../manager_header';
import authHeader from '../auth_header';

const API_URL = 'http://localhost:8088/admin/manager/';
const ACC_URL = 'http://localhost:8020/manager/account/';

class ManagerService {
  /**
   * Fetch all managers.
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
   * Delete a manager's account by ID.
   * @param id The manager's ID.
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
   * Fetch all available managers.
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


const managerService = new ManagerService();
export default managerService;

