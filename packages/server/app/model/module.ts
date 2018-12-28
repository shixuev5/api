import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const moduleSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      type: { type: String, default: 'module' },
      path: { type: String, required: true },
      project_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      stars: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
      ],
    },
    {
      id: false,
      timestamps: true,
    },
  );
  return mongoose.model('Module', moduleSchema);
};
