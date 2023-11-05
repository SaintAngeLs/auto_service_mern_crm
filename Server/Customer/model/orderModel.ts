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
    managerId: string;
    requestedOn: Date;
    deliveredOn?: Date;
    status: string;
}

const orderSchema: MongooseSchema = new mongoose.Schema({
    customerId: { type: String, index: true }, // addingt the index for the customerId
    customerName: { type: String },
    carName: { type: String },
    carNumber: { type: String },
    custAddress: { type: String, max: 40 },
    serviceName: { type: String },
    servicePrice: { type: Number },
    managerId: { type: String }, // adding the index for the managerId
    requestedOn: { type: Date, default: Date.now },
    deliveredOn: { type: Date },
    status: {
        type: String,
        index: true
    },
});

// Creating the indef for the specific pattern of the indexing
orderSchema.index({ customerId: 1, managerId: 1, status: 1 });

export default mongoose.model<IOrder>('order', orderSchema);
