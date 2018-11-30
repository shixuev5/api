import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const starSchema = new mongoose.Schema(
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      groups: {
        type: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
          },
        ],
      },
      projects: {
        type: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
          },
        ],
      },
      modules: {
        type: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
          },
        ],
      },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Star', starSchema);
};
