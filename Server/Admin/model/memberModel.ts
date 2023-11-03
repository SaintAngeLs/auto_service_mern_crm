/**
 * @file userModel.ts
 * 
 * @description Model representation of a user in the system.
 */

import mongoose, { Document, Schema as MongooseSchema} from 'mongoose';

/**
 * Interface for the User model to type check the document properties.
 */
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  mobile?: string;
  role?: string;
  status?: string;
}

const userSchema: MongooseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.../ },
  password: { type: String, required: true },
  mobile: { type: String, index: true },
  role: { type: String, default: "MANAGER" },
  status: { type: String, default: "AVAILABLE" },
});

export default mongoose.model<IUser>('member', userSchema);