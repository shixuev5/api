import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pass: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String },
  });
  return mongoose.model('User', userSchema);
};
