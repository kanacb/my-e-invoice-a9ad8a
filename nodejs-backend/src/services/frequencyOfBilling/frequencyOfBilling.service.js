const { FrequencyOfBilling } = require('./frequencyOfBilling.class');
const createModel = require('../../models/frequencyOfBilling.model');
const hooks = require('./frequencyOfBilling.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/frequencyOfBilling', new FrequencyOfBilling(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('frequencyOfBilling');

  // Get the schema of the collections 
  app.get("/frequencyOfBillingSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};