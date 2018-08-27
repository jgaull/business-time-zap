
const utils = require('../utils');

const addSubtractWorkingTime = (z, bundle) => {

  var path = `/${bundle.inputData.operation}-working-time`;
  var url = utils.getUrl(bundle, path);
  const responsePromise = z.request({
    method: 'GET',
    url: url.toString()
  });
  return responsePromise.then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'addSubtractWorkingTime',
  noun: 'Business Time',

  display: {
    // What the user will see in the Zap Editor when selecting an action
    label: 'Add/Subtract Business Time',
    description: 'Add/subtract an amount of business time to/from a given date.',
    important: true
  },

  operation: {
    // Data users will be asked to set in the Zap Editor
    inputFields: [
      { key: 'operation', label: 'Add or Subtract?', choices: ['add', 'subtract'], required: true },
      {
        key: 'values', label: 'Values', children: [
          { key: 'date', label: 'Date', type: 'datetime', required: true },
          { key: 'amount', label: 'Amount of Time', type: 'number', required: true },
          { key: 'units', label: 'Units', default: 'days', choices: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'], required: true }
        ]
      },
      { key: 'format', label: 'Input Date Format', type: 'string', required: false },
      { key: 'outputFormat', label: 'Output Date Format', type: 'string', required: false },
      utils.getWorkingHoursFields()
    ],
    perform: addSubtractWorkingTime,
    // Sample data that the user will see if they skip the test
    // step in the Zap Editor
    sample: require('../samples/sample-response')
  }
}
