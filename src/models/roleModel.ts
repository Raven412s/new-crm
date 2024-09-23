import { IRole } from '@/types/roles/role-type';
import mongoose, { Document, Schema } from 'mongoose';
import { array } from 'zod';



const RoleSchema: Schema = new Schema({
  name: { type: String, required: true },
  permission: {type: [String]},
});

export default mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema);
