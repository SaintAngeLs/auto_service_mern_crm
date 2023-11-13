/**
 * @file setupDatabaseIndexes.ts
 * 
 * @description Additional function to create the Indexes in the Database
 */

import Order from '../model/orderModel'; 

export const setupOrderDatabaseIndexes = async () => {
  try {
    // Index for the customerId field
    await Order.collection.createIndex({ customerId: 1 });

    // Index for the managerId field
    await Order.collection.createIndex({ managerId: 1 });

    // Index for the status field
    await Order.collection.createIndex({ status: 1 });

    // Compound index for customerId, managerId, and status
    await Order.collection.createIndex({ customerId: 1, managerId: 1, status: 1 });

    console.log('Order model indexes have been created successfully.');
  } catch (error) {
    console.error('Error creating indexes for Order model:', error);
  }
};
