
const utils = require('../utils');

const nextLastWorkingDayTime = (z, bundle) => {

    const pathMap = {
        next: {
            date: '/next-working-day',
            time: '/next-working-time'
        },
        previous: {
            date: '/last-working-day',
            time: '/last-working-time'
        }
    };

    const inputData = bundle.inputData;
    const path = pathMap[inputData.operation][inputData.type];

    const url = utils.getUrl(bundle, path);
    const responsePromise = z.request({
        method: 'GET',
        url: url.toString()
    });
    return responsePromise.then(response => JSON.parse(response.content));
};

module.exports = {
    key: 'nextLastWorkingDayTime',
    noun: 'Business Day/Time',

    display: {
        // What the user will see in the Zap Editor when selecting an action
        label: 'Next/Previous Business Day or Time',
        description: 'Returns the next or previous working day or time.',
        important: true
    },

    operation: {
        // Data users will be asked to set in the Zap Editor
        inputFields: [
            { key: 'operation', label: 'Next or Previous?', choices: ['next', 'previous'], required: true },
            { key: 'type', label: 'Date or Time?', choices: ['date', 'time'], required: true, helpText: 'Choose `Date` to ignore hours, minutes, seconds. Choose `Time` to return the start or end of the next or previous business day. If `Time` is chosen and the given time is during business hours, this will return the given time unchanged.' },
            { key: 'date', label: 'Date', type: 'datetime', required: true },
            utils.getDateFormatField(utils.FIELD_TYPE_INPUT_FORMAT),
            utils.getDateFormatField(utils.FIELD_TYPE_OUTPUT_FORMAT),
            utils.getWorkingHoursFields(),
            utils.getHolidaysField()
        ],
        perform: nextLastWorkingDayTime,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: require('../samples/time-sample')
    }
}
