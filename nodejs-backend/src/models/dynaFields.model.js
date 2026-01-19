module.exports = function (app) {
  const modelName = "dyna_fields";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "dynaFields" model
  const schema = new Schema(
    {
      dynaLoader: {
        type: Schema.Types.ObjectId,
        ref: "dyna_loader",
        required: true,
      },
      from: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 150,
        trim: true,
      },
      fromType: { type: Schema.Types.Mixed, required: true },
      to2: {
        type: String,
        minLength: 2,
        maxLength: 150,
        trim: true,
      },
      toType: {
        type: String,
        minLength: 2,
        maxLength: 150,
        trim: true,
        default: "",
      },
      fromService: {
        type: String,
        minLength: 0,
        maxLength: 150,
        trim: true,
      },
      toService: {
        type: String,
        minLength: 0,
        maxLength: 150,
        trim: true,
        default: "",
      },
      toRefService: {
        type: String,
        minLength: 0,
        maxLength: 150,
        index: true,
        trim: true,
      },
      identifierFieldName: {
        type: String,
        minLength: 0,
        maxLength: 150,
        trim: true,
      },
      duplicates: { type: Boolean, required: true, default: false },

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
