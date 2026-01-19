module.exports = function (app) {
  const modelName = "permission_services";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "permissionServices" model
  const schema = new Schema(
    {
      service: {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      create: { type: Boolean, default: true },
      read: {
        type: String,

        enum: ["all", "own", "subordinates"],
      },
      update: {
        type: String,

        enum: ["all", "own", "subordinate"],
      },
      delete: {
        type: String,

        enum: ["all", "own", "subordinate"],
      },
      profile: { type: Schema.Types.ObjectId, ref: "profiles" },
      roleId: { type: Schema.Types.ObjectId, ref: "roles" },
      positionId: { type: Schema.Types.ObjectId, ref: "positions" },
      employeeId: { type: Schema.Types.ObjectId, ref: "employees" },
      userId: { type: Schema.Types.ObjectId, ref: "users" },

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
