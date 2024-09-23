import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '@/types/users/user-type';



const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  mobile: { type: Number, required: true },
  password: { type: String, select: false, default: bcrypt.hashSync("password", 10) },
  role: { type: String, },
  permissions: { type: Map, of: String },
  _createdAt: { type: Date, default: Date.now },
});

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

export const User: IUserModel = mongoose.models?.User || mongoose.model<IUserDocument>('User', userSchema);
