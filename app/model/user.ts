import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const userSchema = new mongoose.Schema(
    {
      name: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      role: {
        type: String,
        enum: ['fe', 'be', 'te', 'other'],
        default: 'other',
      },
      type: { type: String, enum: ['base', 'ldap'], default: 'base' },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('User', userSchema);
};
