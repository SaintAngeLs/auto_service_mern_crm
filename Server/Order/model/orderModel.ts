/**
 * @file order-model.ts
 * 
 * @description Schema definition for order model in MongoDB using Mongoose.
 * 
 */

import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';


const orderSchema: MongooseSchema = new MongooseSchema({
  customerId: { type: String, index: true }, // adding the index for the CustomerID
  customerName: { type: String },
  carName: { type: String },
  carNumber: { type: String },
  custAddress: { type: String, max: 40 },
  serviceName: { type: String },
  servicePrice: { type: Number },
  managerId: { type: String, index: true }, // adding the index for the managerID
  requestedOn: { type: Date, default: Date.now() },
  deliveredOn: { type: Date },
  status: {
    type: String,
    default: "PLACED",
    index: true // adding the index for the status
  },
});

// Compound index for common query patterns
orderSchema.index({ customerId: 1, managerId: 1, status: 1 });


const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;


