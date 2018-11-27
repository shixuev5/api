import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const permissionSchema = new mongoose.Schema(
    {
      user_id: { type: mongoose.Schema.Types.ObjectId },
      groups: {
        type: [
          {
            group_id: mongoose.Schema.Types.ObjectId,
            role: { type: String, enum: ['owner', 'devloper', 'visitor'] },
          },
        ],
      },
      projects: {
        type: [
          {
            project_id: mongoose.Schema.Types.ObjectId,
            role: { type: String, enum: ['be', 'fe', 'qa'] },
          },
        ],
      },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Permission', permissionSchema);
};
