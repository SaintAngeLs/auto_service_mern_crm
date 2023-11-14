/**
 * @file orderModel.ts
 * 
 * @description Model representation of an order in the system.
 */

import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';


/**
 * Interface for the Order model to type check the document properties.
 */
export interface IOrder extends Document {
  customerId?: string;
  customerName?: string;
  carName?: string;
  carNumber?: string;
  custAddress?: string;
  serviceName?: string;
  servicePrice?: number;
  managerId?: string;
  requestedOn?: Date;
  deliveredOn?: Date;
  status?: string;
}

const orderSchema: MongooseSchema = new mongoose.Schema({
  customerId: { type: String, index: true }, // Adding the index for the customerId
  customerName: { type: String },
  carName: { type: String },
  carNumber: { type: String, index: true }, // Adding the index for the carNumber
  custAddress: { type: String, max: 40 },
  serviceName: { type: String },
  servicePrice: { type: Number },
  managerId: { type: String, index: true }, // Adding the index for the managerId
  requestedOn: { type: Date, default: Date.now, index: true }, // Add the index on requestedOn
  deliveredOn: { type: Date },
  status: { type: String, index: true}, // Adding the index for the status
});

// Create compound indexes if there are queries that will benefit from these
// orderSchema.index({ customerId: 1, status: 1 });
// orderSchema.index({ managerId: 1, status: 1 });

export default mongoose.model<IOrder>('order', orderSchema);