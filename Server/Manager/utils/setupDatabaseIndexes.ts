// setupManagerDatabaseIndexes.ts

import Member from '../model/memberModel'; // Import the Member model
import Order from '../model/orderModel'; // Import the Order model

export const setupManagerDatabaseIndexes = async () => {
  try {
    // Member model indexes
    await Member.collection.createIndex({ email: 1 }, { unique: true });
    await Member.collection.createIndex({ status: 1 });

    // Order model indexes
    await Order.collection.createIndex({ customerId: 1 });
    await Order.collection.createIndex({ managerId: 1 });
    await Order.collection.createIndex({ status: 1 });
    await Order.collection.createIndex({ customerId: 1, status: 1, managerId: 1 }); // Compound index

    console.log('Manager related indexes have been created successfully.');
  } catch (error) {
    console.error('Error creating manager related indexes:', error);
  }
};
