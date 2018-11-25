import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const groupSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      path: { type: String, required: true },
      permission: { type: String, enum: ['private', 'shared', 'public'] },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Group', groupSchema);
};
