import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const interfaceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    module_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  }, {
    timestamps: true,
  });
  return mongoose.model('Interface', interfaceSchema);
};
