import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: {
    users: {
      add: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      view: { type: Boolean, default: false },
    },
    products: {
      add: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      view: { type: Boolean, default: false },
    },
    orders: {
      add: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      view: { type: Boolean, default: false },
    },
    analytics: {
      add: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      view: { type: Boolean, default: false },
    },
  },
});

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

export { Role };
