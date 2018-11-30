import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const userSchema = new mongoose.Schema(
    {
      name: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      salt: { type: String, required: true },
      avatar: { type: String },
      guide: { type: Boolean, default: true },
      star: {
        type: [Object],
        enum: [
          { group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' } },
          {
            project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
          },
          { module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' } },
        ],
      },
      role: {
        type: String,
        enum: ['fe', 'be', 'qa', 'other'],
        default: 'other',
      },
      source: { type: String, enum: ['site', 'ldap'], default: 'site' },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('User', userSchema);
};
