import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const groupSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      desc: String,
      members: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: { select: ['name', 'avatar'] } },
          role: { type: String, enum: ['owner', 'devloper', 'visitor'] },
          expired: { type: Date, get: (v) => new Date(v).getTime() },
          authorized: { type: Date, default: Date.now() },
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
