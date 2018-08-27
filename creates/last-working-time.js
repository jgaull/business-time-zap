
const sample = require('../samples/sample-response');
const utils = require('../utils');

const lastWorkingTime = (z, bundle) => {

    var url = utils.getUrl(bundle, '/last-working-time');
    const responsePromise = z.request({
        method: 'GET',
        url: url.toString()
    });
    return responsePromise.then(response => JSON.parse(response.content));
};

module.exports = {
    key: 'lastWorkingTime',
    noun: 'Business Time',

    display: {
        // What the user will see in the Zap Editor when selecting an action
        label: 'Previous Business Time',
        description: 'Returns the end of the previous business day relative to a given date. Returns the given date if it is during business hours.'
    },

    operation: {
        // Data users will be asked to set in the Zap Editor
        inputFields: [
            { key: 'date', label: 'Date', type: 'datetime', required: true },
            { key: 'format', label: 'Input Date Format', type: 'string', required: false },
            { key: 'outputFormat', label: 'Output Date Format', type: 'string', required: false },
            utils.getWorkingHoursFields()
        ],
        perform: lastWorkingTime,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: sample
    }
}
