
const utils = require('../utils');

const isWorkingDay = (z, bundle) => {

    const url = utils.getUrl(bundle, '/is-working-day', z);
    const responsePromise = z.request({
        method: 'GET',
        url: url.toString()
    });
    return responsePromise.then(response => JSON.parse(response.content));
};

module.exports = {
    key: 'isWorkingDay',
    noun: 'Business Day',

    display: {
        // What the user will see in the Zap Editor when selecting an action
        label: 'Is Business Day?',
        description: 'Determine if a date is a business day.'
    },

    operation: {
        // Data users will be asked to set in the Zap Editor
        inputFields: [
            { key: 'date', label: 'Date', type: 'datetime', required: true },
            utils.getDateFormatField(utils.FIELD_TYPE_INPUT_FORMAT),
            utils.getWorkingHoursFields(),
            utils.getHolidaysField()
        ],
        perform: isWorkingDay,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: require('../samples/is-working-day-sample')
    }
}
