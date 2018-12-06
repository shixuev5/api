import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const envSchema = new mongoose.Schema(
    {
      name: { type: String },
      key: { type: String, required: true },
      value: { type: String, required: true },
      global: { type: Boolean, default: false },
    },
    {
      id: false,
      timestamps: true,
    },
  );

  const projectSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      path: String,
      desc: String,
      envs: [envSchema],
      group_id: { type: mongoose.Schema.Types.ObjectId },
      members: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          role: { type: String, enum: ['owner', 'devloper', 'visitor'] },
        },
      ],
      stars: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
      ],
      permission: {
        type: String,
        enum: ['private', 'shared', 'public'],
        default: 'private',
      },
      before_script: String,
      after_script: String,
      archive: { type: Boolean, default: false },
    },
    {
      id: false,
      timestamps: true,
    },
  );
  return mongoose.model('Project', projectSchema);
};
