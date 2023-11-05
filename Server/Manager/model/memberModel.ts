/**
 * @file memberModel.ts
 * 
 * @description Member model schema for MongoDB using Mongoose.
 * 
 */

import mongoose, { Document, Schema as MongooseSchema} from 'mongoose';

// Define the member interface
interface IMember extends Document {
    name: string;
    email: string;
    password: string;
    role?: string;
    mobile?: string;
    status?: string;
}

const userSchema: MongooseSchema = new MongooseSchema({
    _id: MongooseSchema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // creating the unique index in the mongo DB
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, required: true },
    role: { type: String },
    mobile: { type: String },
    status: { type: String },
});

// Adding the single field inxes on the status
userSchema.index({ status: 1 });

const MemberModel = mongoose.model<IMember>('member', userSchema);

export default MemberModel;
