import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  name: string;
  email: string;
  mobile: number;
  password: string;
  role: string;
  _createdAt: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  mobile:{type: Number, required: true},
  password: { type: String, select: false, default: bcrypt.hash("password",10)},
  role: { type: String, default: 'user' },
  _createdAt: { type: Date, default: Date.now }
});

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

export const User: IUserModel = mongoose.models?.User || mongoose.model<IUserDocument>('User', userSchema);
