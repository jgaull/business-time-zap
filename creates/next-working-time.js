
const sample = require('../samples/sample-response');
const utils = require('../utils');

const nextWorkingTime = (z, bundle) => {

    var url = utils.getUrl(bundle, '/next-working-time');
    const responsePromise = z.request({
        method: 'GET',
        url: url.toString()
    });
    return responsePromise.then(response => JSON.parse(response.content));
};

module.exports = {
    key: 'nextWorkingTime',
    noun: 'Business Time',

    display: {
        // What the user will see in the Zap Editor when selecting an action
        label: 'Next Business Time',
        description: 'Returns the start of the next business day relative to a given date. Returns the given date if it is during business hours.'
    },

    operation: {
        // Data users will be asked to set in the Zap Editor
        inputFields: [
            { key: 'date', label: 'Date', type: 'datetime', required: true },
            utils.getDateFormatField(utils.FIELD_TYPE_INPUT_FORMAT),
            utils.getDateFormatField(utils.FIELD_TYPE_OUTPUT_FORMAT),
            utils.getWorkingHoursFields()
        ],
        perform: nextWorkingTime,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: sample
    }
}
