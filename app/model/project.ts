import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const projectSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      path: { type: String, required: true },
      env: [],
      permission: { type: String, enum: ['private', 'shared', 'public'] },
      archive: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Project', projectSchema);
};
