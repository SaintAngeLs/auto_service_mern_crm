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
  customerId: { type: String },
  customerName: { type: String },
  carName: { type: String },
  carNumber: { type: String },
  custAddress: { type: String, max: 40 },
  serviceName: { type: String },
  servicePrice: { type: Number },
  managerId: { type: String },
  requestedOn: { type: Date, default: Date.now, index: true },
  deliveredOn: { type: Date },
  status: { type: String },
});

export default mongoose.model<IOrder>('order', orderSchema);