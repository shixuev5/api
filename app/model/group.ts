import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const groupSchema = new mongoose.Schema({

  }, {
    timestamps: true,
  });
  return mongoose.model('Group', groupSchema);
};
