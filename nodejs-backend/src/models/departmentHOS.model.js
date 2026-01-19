module.exports = function (app) {
  const modelName = "department_h_o_s";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "departmentHOS" model
  const schema = new Schema(
    {
      sectionId: {
        type: Schema.Types.ObjectId,
        ref: "sections",
        required: true,
      },
      employeeId: { type: Schema.Types.ObjectId, ref: "employees" },

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
