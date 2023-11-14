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
    customerId: { type: String, index: true }, // index for the customerID
    customerName: { type: String },
    carName: { type: String },
    carNumber: { type: String },
    custAddress: { type: String, max: 40 },
    serviceName: { type: String },
    servicePrice: { type: Number },
    managerId: { type: String, index: true }, // index for managerID
    requestedOn: { type: Date, default: Date.now() },
    deliveredOn: { type: Date },
    status: { type: String,  index: true }, // Index for status
});


// Create a compound index for frequently query on multiple fields
orderSchema.index({ customerId: 1, status: 1, managerId: 1 });

const OrderModel = mongoose.model<IOrder>('order', orderSchema);

export default OrderModel;
