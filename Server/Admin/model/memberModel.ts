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
  name: { type: String, required: true},
  email: { type: String, required: true, index: true, unique: true, match: /.../ }, // the index for the email
  password: { type: String, required: true },
  mobile: { type: String, index: true}, // The index of the mobile
  role: { type: String, default: "MANAGER",  index: true},
  status: { type: String, default: "AVAILABLE", index: true }, // The index of the status
});



userSchema.index({ role: 1, status: 1 });

export default mongoose.model<IUser>('member', userSchema);