import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const logSchema = new mongoose.Schema(
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      type: { type: String, enum: ['group', 'project', 'module', 'interface'], required: true },
      action: { type: String, enum: ['create', 'update', 'delete'], required: true },
      old_version: { type: mongoose.Schema.Types.Mixed },
      new_version: { type: mongoose.Schema.Types.Mixed },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Log', logSchema);
};
