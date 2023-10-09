/**
 * @file auth_service.ts
 * 
 * @description Service functions for authentication operations.
 * 
 */

import axios, { AxiosResponse } from 'axios';
import authHeader from './auth_header';

const AUTH_URL = 'http://localhost:8080/customer/auth/';

class AuthService {
  private authenticated: boolean;

  constructor() {
    this.authenticated = false;

    // Initialize authentication status on page load.
    const storedCustomer = this.getCurrentCustomer();
    if (storedCustomer && storedCustomer.token) {
      this.authenticated = true;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + storedCustomer.token;
    }
  }

  /**
   * Authenticates a user based on email and password.
   * @param email User's email.
   * @param password User's password.
   */
  async login(email: string, password: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(AUTH_URL + "login", { email, password });
      if (response.data && response.data.token) {
        console.log(response.data.userId);
        this.authenticated = true;
        localStorage.setItem("customer", JSON.stringify(response.data));
        console.log('# Response.data:', response.data)
        const headers = authHeader();  // Use the authHeader function here
        Object.keys(headers).forEach(key => {
          axios.defaults.headers.common[key] = headers[key as keyof typeof headers];
        });
      }
      return response.data;
    } catch (err) {
      console.log("Login Error: ", err);
      throw err;  // Throwing the error to be caught by the calling function.
    }
  }

  /**
   * Logs out the authenticated user.
   */
  logout(): void {
    this.authenticated = false;
    localStorage.removeItem("customer");
    delete axios.defaults.headers.common['Authorization'];
    console.log("Inside Logout Method");
  }

  /**
   * Registers a new user.
   * @param name User's name.
   * @param email User's email.
   * @param password User's password.
   */
  async register(name: string, email: string, password: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(AUTH_URL + "register", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      console.log("Registration Error: ", err);
      throw err;
    }
  }

  /**
   * Checks if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  /**
   * Retrieves the currently stored customer from local storage.
   */
  getCurrentCustomer(): { token?: string } | null {
    return JSON.parse(localStorage.getItem("customer") || 'null');
  }
}

export default new AuthService();
