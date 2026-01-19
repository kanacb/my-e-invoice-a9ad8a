module.exports = function (app) {
  const modelName = "employees";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "employees" model
  const schema = new Schema(
    {
      empNo: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true,
      },
      fullname: {
        type: String,
        required: true
      },
      userEmail: {
        type: String,
        required: true,
      },
      company: { type: Schema.Types.ObjectId, ref: "companies" },
      department: { type: Schema.Types.ObjectId, ref: "departments" },
      section: { type: Schema.Types.ObjectId, ref: "sections" },
      position: { type: Schema.Types.ObjectId, ref: "positions" },
      supervisor: { type: Schema.Types.ObjectId, ref: "employees" },
      dateJoined: { type: Date, required: false },
      dateTerminated: { type: Date, required: false },
      resigned: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      empGroup: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      empCode: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
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
