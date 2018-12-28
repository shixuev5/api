import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, default: 'template' },
    desc: String,
    path: String,
    method: String,
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
    tags: [String],
    project_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  }, {
    id: false,
    timestamps: true,
  });
  return mongoose.model('Template', templateSchema);
};
