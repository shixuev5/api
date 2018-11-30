import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const interfaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: String,
    path: { type: String, required: true },
    method: { type: String, required: true },
    request: {
      type: {
        header: [],
        params: [],
        body: {},
      },
    },
    response: {
      type: {
        header: [],
        body: {},
      },
    },
    state: { type: String, enum: ['dev', 'debug', 'complete', 'mainten', 'drop'], default: 'dev'},
    mock: { type: Boolean, default: true },
    module_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  }, {
    timestamps: true,
  });
  return mongoose.model('Interface', interfaceSchema);
};
