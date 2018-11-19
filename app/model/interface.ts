import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const interfaceSchema = new mongoose.Schema({

  });
  return mongoose.model('Interface', interfaceSchema);
};