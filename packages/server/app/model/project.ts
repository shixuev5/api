import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const projectSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      path: { type: String, required: true },
      desc: String,
      env: [{
        name: { type: String, required: true },
        key: { type: String, required: true },
        value: { type: String, required: true },
        initial: String,
        global: { type: Boolean, default: false },
      }],
      group_id: { type: mongoose.Schema.Types.ObjectId },
      members: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          role: { type: String, enum: ['owner', 'devloper', 'visitor'] },
        },
      ],
      permission: {
        type: String,
        enum: ['private', 'shared', 'public'],
        default: 'private',
      },
      archive: { type: Boolean, default: false },
    },
    {
      id: false,
      timestamps: true,
    },
  );
  return mongoose.model('Project', projectSchema);
};
