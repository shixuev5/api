import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const moduleSchema = new mongoose.Schema({

  }, {
    timestamps: true,
  });
  return mongoose.model('Module', moduleSchema);
};
