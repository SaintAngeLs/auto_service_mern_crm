/**
 * @file orderModel.ts
 * 
 * @description Order model schema for MongoDB using Mongoose.
 * 
 */

import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

// Define the order interface
interface IOrder extends Document {
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
    status: { type: String },
});

const OrderModel = mongoose.model<IOrder>('order', orderSchema);
export default OrderModel;
