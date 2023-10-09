/**
 * @file customer_service.dev.ts
 * @description This file defines the CustomerService class that provides methods for customer related operations.
 */

import axios from "axios";
import authHeader from "../authentication/auth_header";

// Define the endpoints for the customer operations
const ORDER_URL = "http://localhost:8030/order/";
const CUST_ORDER = "http://localhost:8080/customer/order/";

class CustomerService {
    // Place an order for a customer
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
            const response = await axios.post(ORDER_URL + "addOrder", {
                customerId,
                customerName,
                carName,
                carNumber,
                custAddress,
                serviceName,
                servicePrice
            }, {
                headers: authHeader()
            });
            return response.data.message;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // Fetch orders for a specific customer by their ID
    async findMyOrders(id: string): Promise<any[]> {
        try {
            const response = await axios.get(CUST_ORDER + "findOrders/" + id, {
                headers: authHeader()
            });
            return response.data.orders;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // Fetch a customer by their ID
    async findCustomerById(id: string): Promise<any> {
        try {
            const response = await axios.get(`http://localhost:8080/customer/account/findCustById/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default new CustomerService();
