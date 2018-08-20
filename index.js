
const addWorkingTime = require('./creates/add-working-time');
const authentication = require('./authentication');

const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response;
};

const App = {
  // This is just shorthand to reference the installed dependencies
  // you have. Zapier will need to know these before we can upload!
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  // beforeRequest & afterResponse are optional hooks into the
  // provided HTTP client
  beforeRequest: [
  ],

  afterResponse: [
    handleHTTPError
  ],

  // If you want to define optional resources to simplify
  // creation of triggers,  searches, creates - do that here!
  resources: {
  },

  triggers: {
  },

  searches: {
  },

  creates: {
    [addWorkingTime.key]: addWorkingTime,
  }
};

// Finally, export the app.
module.exports = App;