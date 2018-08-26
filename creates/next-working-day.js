
const sample = require('../samples/sample-response');
const utils = require('../utils');

const nextWorkingDay = (z, bundle) => {

    var url = utils.getUrl(bundle, '/next-working-day');
    const responsePromise = z.request({
        method: 'GET',
        url: url.toString()
    });
    return responsePromise.then(response => JSON.parse(response.content));
};

module.exports = {
    key: 'nextWorkingDay',
    noun: 'Working Day',

    display: {
        // What the user will see in the Zap Editor when selecting an action
        label: 'Next Working Day',
        description: 'Returns the working day after the given date'
    },

    operation: {
        // Data users will be asked to set in the Zap Editor
        inputFields: [
            { key: 'date', label: 'Date', type: 'datetime', required: true },
            { key: 'format', label: 'Input Date Format', type: 'string', required: false },
            { key: 'outputFormat', label: 'Output Date Format', type: 'string', required: false },
            { key: 'sundayOpen', label: 'Sunday Open', type: 'datetime', required: false },
            { key: 'sundayClose', label: 'Sunday Close', type: 'datetime', required: false },
            { key: 'mondayOpen', label: 'Monday Open', type: 'datetime', required: false },
            { key: 'mondayClose', label: 'Monday Close', type: 'datetime', required: false },
            { key: 'tuesdayOpen', label: 'Tuesday Open', type: 'datetime', required: false },
            { key: 'tuesdayClose', label: 'Tuesday Close', type: 'datetime', required: false },
            { key: 'wednesdayOpen', label: 'Wednesday Open', type: 'datetime', required: false },
            { key: 'wednesdayClose', label: 'Wednesday Close', type: 'datetime', required: false },
            { key: 'thursdayOpen', label: 'Thursday Open', type: 'datetime', required: false },
            { key: 'thursdayClose', label: 'Thursday Close', type: 'datetime', required: false },
            { key: 'fridayOpen', label: 'Friday Open', type: 'datetime', required: false },
            { key: 'fridayClose', label: 'Friday Close', type: 'datetime', required: false },
            { key: 'saturdayOpen', label: 'Saturday Open', type: 'datetime', required: false },
            { key: 'saturdayClose', label: 'Saturday Close', type: 'datetime', required: false }
        ],
        perform: nextWorkingDay,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: sample
    }
}
