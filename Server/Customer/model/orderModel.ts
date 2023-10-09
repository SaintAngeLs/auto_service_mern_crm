/**
 * @file orderModel.ts
 * 
 * @description Order Model - Represents an order in the database.
 * 
 */

import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

export interface IOrder extends Document {
    customerId: string;
    customerName: string;
    carName: string;
    carNumber: string;
    custAddress: string;
    serviceName: string;
    servicePrice: number;
    mechanicId: string;
    requestedOn: Date;
    deliveredOn?: Date;
    status: string;
}

const orderSchema: MongooseSchema = new mongoose.Schema({
    customerId: { type: String },
    customerName: { type: String },
    carName: { type: String },
    carNumber: { type: String },
    custAddress: { type: String, max: 40 },
    serviceName: { type: String },
    servicePrice: { type: Number },
    mechanicId: { type: String },
    requestedOn: { type: Date, default: Date.now },
    deliveredOn: { type: Date },
    status: {
        type: String,
    },
});

export default mongoose.model<IOrder>('order', orderSchema);
