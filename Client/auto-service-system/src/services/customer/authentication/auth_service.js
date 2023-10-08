import axios from "axios";
import authHeader from "./auth_header";

const AUTH_URL = "http://localhost:8080/customer/auth/";

class AuthService {
  constructor() {
    this.authenticated = false;

    // Initialize authentication status on page load.
    const storedCustomer = this.getCurrentCustomer();
    if (storedCustomer && storedCustomer.token) {
      this.authenticated = true;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + storedCustomer.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(AUTH_URL + "login", { email, password });
      if (response.data && response.data.token) {
        console.log(response.data.userId);
        this.authenticated = true;
        localStorage.setItem("customer", JSON.stringify(response.data));
        const headers = authHeader();  // Use the authHeader function here
        Object.keys(headers).forEach(key => {
          axios.defaults.headers.common[key] = headers[key];
        });
      }
      return response.data;
    } catch (err) {
      console.log("Login Error: ", err);
      throw err;  // Throwing the error to be caught by the calling function.
    }
}

  logout() {
    this.authenticated = false;
    localStorage.removeItem("customer");
    delete axios.defaults.headers.common['Authorization'];
    console.log("Inside Logout Method");
  }

  async register(name, email, password) {
    try {
      const response = await axios.post(AUTH_URL + "register", {
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

  isAuthenticated() {
    return this.authenticated;
  }
  getCurrentCustomer() {
    return JSON.parse(localStorage.getItem("customer"));
  }
}

export default new AuthService();
