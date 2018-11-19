import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const moduleSchema = new mongoose.Schema({

  });
  return mongoose.model('Module', moduleSchema);
};