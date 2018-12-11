import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const groupSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      desc: String,
      members: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          role: { type: String, enum: ['owner', 'devloper', 'visitor'] },
        },
      ],
      permission: { type: String, enum: ['private', 'shared', 'public'] },
    },
    {
      id: false,
      timestamps: true,
    },
  );
  return mongoose.model('Group', groupSchema);
};
