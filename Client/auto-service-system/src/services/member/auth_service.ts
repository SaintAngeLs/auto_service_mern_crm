/**
 * @file auth_service.ts
 * @description This file contains the service functions for authentication and authorization tasks.
 */

import axios, { AxiosResponse } from 'axios';
import authHeader from './auth_header';

const AUTH_URL = 'http://localhost:8088/admin/auth/';

class AuthService {
  /**
   * Logs in a user and stores their information based on their role.
   */
  login(email: string, password: string): Promise<any> {
    return axios
      .post(AUTH_URL + 'login', { email, password })
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw new Error('Failed to login. Status code: ' + response.status);
        }

        if (response.data.token) {
          if (response.data.role === 'ADMIN') {
            console.log(response.data.name);
            localStorage.setItem('admin', JSON.stringify(response.data));
          } else {
            console.log(response.data.name);
            localStorage.setItem('mechanic', JSON.stringify(response.data));
          }
        }

        return response.data;
      })
      .catch((err: Error) => {
        console.log('Login Error:', err);
        throw err;
      });
  }

  /**
   * Registers a new mechanic with the given details.
   */
  registerMechanic(name: string, email: string, password: string, mobile: string): Promise<string> {
    return axios
      .post(
        AUTH_URL + 'register',
        { name, email, password, mobile },
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
   * Logs out an admin user.
   */
  logout(): void {
    localStorage.removeItem('admin');
    console.log('Inside Logout Method');
  }

  /**
   * Logs out a mechanic user.
   */
  logoutMechanic(): void {
    localStorage.removeItem('mechanic');
    console.log('Inside Logout Method');
  }

  /**
   * Registers a new user (generic method, not specific to mechanics or admins).
   */
  register(name: string, email: string, password: string): Promise<AxiosResponse> {
    return axios.post(AUTH_URL + 'register', {
      name,
      email,
      password,
    });
  }

  /**
   * Gets the current logged-in mechanic's details.
   */
  getCurrentMechanic(): any {
    return JSON.parse(localStorage.getItem('mechanic') || '{}');
  }

  /**
   * Gets the current logged-in admin's details.
   */
  getAdmin(): any {
    return JSON.parse(localStorage.getItem('admin') || '{}');
  }
}

export default new AuthService();
