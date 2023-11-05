/**
 * @file customerModel.ts
 * 
 * @description Customer Model - Represents a customer in the database.
 * 
 */

import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

const customerSchema: MongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 4,
        max: 20,
    },
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String },
    role: {
        type: String,
        default: 'CUSTOMER',
    },
});

// Impoertant examples of the indexes creation in the schema:
// customerSchema.index({ fieldname: 1 }); // For ascending order
// customerSchema.index({ fieldname: -1 }); // For descending order


export default mongoose.model<ICustomer>('customer', customerSchema);
