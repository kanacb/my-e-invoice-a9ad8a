module.exports = function (app) {
  const modelName = "templates";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for templates model
  const schema = new Schema(
    {
      name: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      subject: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      body: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      variables: {
        type: [String],

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      image: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
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
