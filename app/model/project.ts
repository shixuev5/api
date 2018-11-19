import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const projectSchema = new mongoose.Schema({

  });
  return mongoose.model('Project', projectSchema);
};
