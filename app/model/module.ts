import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const moduleSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      path: { type: String, required: true },
      project_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Module', moduleSchema);
};
