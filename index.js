
const addWorkingTime = require('./creates/add-working-time');
const subtractWorkingTime = require('./creates/subtract-working-time');
const nextWorkingDay = require('./creates/next-working-day');
const nextWorkingTime = require('./creates/next-working-time');
const lastWorkingDay = require('./creates/last-working-day');
const lastWorkingTime = require('./creates/last-working-time');
const isWorkingDay = require('./creates/is-working-day');
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
  //authentication: authentication,

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
    [subtractWorkingTime.key]: subtractWorkingTime,
    [nextWorkingDay.key]: nextWorkingDay,
    [lastWorkingDay.key]: lastWorkingDay,
    [isWorkingDay.key]: isWorkingDay,
    [lastWorkingTime.key]: lastWorkingTime,
    [nextWorkingTime.key]: nextWorkingTime
  }
};

// Finally, export the app.
module.exports = App;