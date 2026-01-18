module.exports = function (app) {
  const modelName = "products";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      productName: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      quantity: { type: Number, required: false, min: 0, max: 1000000 },
      unitPrice: { type: Number, required: false, min: 0, max: 1000000 },
      measurement: { type: Schema.Types.ObjectId, ref: "measurements" },
      invoiceId: { type: Schema.Types.ObjectId, ref: "invoices" },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
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
