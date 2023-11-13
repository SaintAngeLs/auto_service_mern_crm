/**
 * @file setupDatabaseIndexes.ts
 * 
 * @description Additional function to create the Indexes in the Database
 */

import mongoose from 'mongoose';
import Member from '../model/memberModel';
import Customer from '../model/customerModel';
import Order from '../model/orderModel'; 
import Service from '../model/serviceModel'; 

export const setupDatabaseIndexes = async () => {
  try {
    // Member model indexes
    await Member.collection.createIndex({ email: 1 }, { unique: true });
    await Member.collection.createIndex({ role: 1, status: 1 });

    // Customer model indexes
    await Customer.collection.createIndex({ email: 1 }, { unique: true });
    await Customer.collection.createIndex({ name: 1 });
    await Customer.collection.createIndex({ role: 1 });

    // Order model indexes
    await Order.collection.createIndex({ customerId: 1 });
    await Order.collection.createIndex({ carNumber: 1 });
    await Order.collection.createIndex({ managerId: 1 });
    await Order.collection.createIndex({ requestedOn: 1 });
    await Order.collection.createIndex({ status: 1 });

    // Compound indexes for Order model, uncomment if needed
    // await Order.collection.createIndex({ customerId: 1, status: 1 });
    // await Order.collection.createIndex({ managerId: 1, status: 1 });

    // Service model indexes
    await Service.collection.createIndex({ serviceType: 1 });
    await Service.collection.createIndex({ price: 1 });
    // Note: The 'name' field is already unique, hence an index will automatically be created for it

    console.log('Indexes have been created successfully for all models.');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};
