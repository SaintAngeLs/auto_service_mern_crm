/**
 * @file order-model.ts
 * 
 * @description Schema definition for order model in MongoDB using Mongoose.
 * 
 */

import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';


const orderSchema: MongooseSchema = new MongooseSchema({
  customerId: { type: String },
  customerName: { type: String },
  carName: { type: String },
  carNumber: { type: String },
  custAddress: { type: String, max: 40 },
  serviceName: { type: String },
  servicePrice: { type: Number },
  managerId: { type: String },
  requestedOn: { type: Date, default: Date.now() },
  deliveredOn: { type: Date },
  status: {
    type: String,
    default: "PLACED",
  },
});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;


