
const utils = require('../utils');

const lastWorkingDay = (z, bundle) => {

    const url = utils.getUrl(bundle, '/last-working-day');
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
            utils.getDateFormatField(utils.FIELD_TYPE_INPUT_FORMAT),
            utils.getDateFormatField(utils.FIELD_TYPE_OUTPUT_FORMAT),
            utils.getWorkingHoursFields(),
            utils.getHolidaysField()
        ],
        perform: lastWorkingDay,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: require('../samples/date-sample')
    }
}
