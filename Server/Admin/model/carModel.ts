/**
 * @file carModel.ts
 * 
 * @description Model representation of a car in the system.
 */

import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * Interface for the Car model to type check the document properties.
 */
export interface ICar extends Document {
  name: string;
  brand: string;
}

const carSchema: MongooseSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true,
  },
  brand: {
      type: String,
      required: true,
  }
});

export default mongoose.model<ICar>('car', carSchema);
