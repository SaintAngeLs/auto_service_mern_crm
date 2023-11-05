/**
 * @file serviceModel.ts
 * 
 * @description Model representation of a service in the system.
 */


import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * Interface for the Service model to type check the document properties.
 */
export interface IService extends Document {
  serviceType: string;
  name: string;
  price: number;
  description: string;
  timeRequired: string;
  where: string;
}

const serviceSchema: MongooseSchema = new mongoose.Schema({
  serviceType: { type: String, max: 15, required: true, index: true }, // Adding the index for the seriviceType
  name: { type: String, required: true, unique: true }, // Indirect indexing unique value
  price: { type: Number, required: true, max: 50000, index: true}, // Adding the index for the price
  description: { type: String, required: true, max: 30 },
  timeRequired: { type: String, required: true },
  where: { type: String, required: true, max: 20 },
});

export default mongoose.model<IService>('services', serviceSchema);
