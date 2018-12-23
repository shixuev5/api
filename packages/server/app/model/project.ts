import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const envSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      value: { type: String, required: true },
      desc: String,
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
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: { select: ['name', 'avatar'] } },
          role: { type: String, enum: ['owner', 'devloper', 'visitor'] },
          expired: { type: Date, get: (v) => new Date(v).getTime() },
          authorized: { type: Date, default: Date.now() },
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
