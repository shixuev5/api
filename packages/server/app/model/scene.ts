import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const sceneSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
    },
    {
      id: false,
      timestamps: true,
    },
  );
  return mongoose.model('Scene', sceneSchema);
};
