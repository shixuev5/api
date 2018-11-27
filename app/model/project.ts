import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const projectSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      path: { type: String, required: true },
      env: [],
      group_id: { type: mongoose.Schema.Types.ObjectId },
      permission: { type: String, enum: ['private', 'shared', 'public'], default: 'private' },
      archive: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Project', projectSchema);
};
