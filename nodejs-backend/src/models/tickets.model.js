module.exports = function (app) {
  const modelName = "tickets";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for tickets model
  const schema = new Schema(
    {
      ticket: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 150,
        index: true,
        trim: true,
      },
      project: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 150,
        index: true,
        trim: true,
      },
      title: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      description: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      status: {
        type: String,

        enum: ["open", "closed", "inprogress", "reopened"],
      },
      priority: {
        type: String,

        enum: ["high", "medium", "low", "critical"],
      },
      type: {
        type: String,

        enum: ["bug", "feature", "task"],
      },
      reporter: { type: Schema.Types.ObjectId, ref: "users" },
      assignee: { type: Schema.Types.ObjectId, ref: "users" },
      closed: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
