import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const interfaceSchema = new mongoose.Schema({

  }, {
    timestamps: true,
  });
  return mongoose.model('Interface', interfaceSchema);
};
