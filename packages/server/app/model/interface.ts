import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const interfaceSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      type: { type: String, default: 'interface' },
      desc: String,
      path: { type: String, required: true },
      method: { type: String, required: true },
      request: {
        type: {
          params: [],
          header: [],
          body: {},
        },
      },
      response: {
        type: {
          header: [],
          body: {},
        },
      },
      status: {
        type: String,
        enum: ['define', 'dev', 'debug', 'test', 'mainten', 'drop'],
        default: 'define',
      },
      mock: { type: Boolean, default: true },
      project_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      module_id: { type: mongoose.Schema.Types.ObjectId },
    },
    {
      id: false,
      timestamps: true,
    },
  );
  return mongoose.model('Interface', interfaceSchema);
};
