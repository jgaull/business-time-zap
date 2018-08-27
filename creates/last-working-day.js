
const sample = require('../samples/sample-response');
const utils = require('../utils');

const lastWorkingDay = (z, bundle) => {

    var url = utils.getUrl(bundle, '/last-working-day');
    const responsePromise = z.request({
        method: 'GET',
        url: url.toString()
    });
    return responsePromise.then(response => JSON.parse(response.content));
};

module.exports = {
    key: 'lastWorkingDay',
    noun: 'Business Day',

    display: {
        // What the user will see in the Zap Editor when selecting an action
        label: 'Previous Business Day',
        description: 'Returns the business day before the given date',
        important: true
    },

    operation: {
        // Data users will be asked to set in the Zap Editor
        inputFields: [
            { key: 'date', label: 'Date', type: 'datetime', required: true },
            { key: 'format', label: 'Input Date Format', type: 'string', required: false },
            { key: 'outputFormat', label: 'Output Date Format', type: 'string', required: false },
            utils.getWorkingHoursFields()
        ],
        perform: lastWorkingDay,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: sample
    }
}
