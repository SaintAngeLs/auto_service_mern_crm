/**
 * @file setupCustomerDatabaseIndexes.ts
 * 
 * @description Additional function to create the Indexes in the Database
 */


// setupCustomerDatabaseIndexes.ts

import mongoose from 'mongoose';
import Customer from '../model/customerModel'; 
import Order from '../model/orderModel';

export const setupCustomerDatabaseIndexes = async () => {
  try {
    const customerCollection = mongoose.connection.collection('customers');
    const orderCollection = mongoose.connection.collection('orders');

    // Create indexes for the Customer model
    await customerCollection.createIndex({ email: 1 }, { unique: true });
    // Add any additional indexes required for the Customer model here

    // Create indexes for the Order model
    await orderCollection.createIndex({ customerId: 1 });
    await orderCollection.createIndex({ managerId: 1 });
    await orderCollection.createIndex({ status: 1 });
    // Create a compound index for the Order model
    await orderCollection.createIndex({ customerId: 1, managerId: 1, status: 1 });

    console.log('Indexes for Customer and Order models have been created successfully.');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};
