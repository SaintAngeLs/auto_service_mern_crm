/**
 * @file customerModel.ts
 * 
 * @description Model representation of a customer in the system.
 */

import mongoose, { Document, Schema as MongooseSchema} from 'mongoose';

/**
 * Interface for the Customer model to type check the document properties.
 */
export interface ICustomer extends Document {
  name: string;
  email: string;
  password: string;
  role?: string;
}

const customerSchema: MongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 4,
    max: 20,
    index: true, // Adding the Index for the name
  },
  email: {
    type: String,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String },
  role: {
    type: String,
    default: "CUSTOMER",
    index: true, // Adding the index for the status
  },

});

export default mongoose.model<ICustomer>('customer', customerSchema);