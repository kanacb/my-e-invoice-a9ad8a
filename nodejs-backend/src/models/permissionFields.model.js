module.exports = function (app) {
  const modelName = "permission_fields";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      servicePermissionId: {
        type: Schema.Types.ObjectId,
        ref: "permission_services",
        required: true,
      },
      fieldName: {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      onCreate: { type: Boolean, default: true },
      onUpdate: { type: Boolean, default: true },
      onDetail: { type: Boolean, default: true },
      onTable: { type: Boolean, default: true },

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
