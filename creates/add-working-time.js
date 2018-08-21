const sample = require('../samples/sample-response');
const UrlAssembler = require('url-assembler');
const moment = require('moment');

const addWorkingTime = (z, bundle) => {

    var workingHours = {};

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var hoursFormat = 'HH:mm:ss';
    var useDefaultHours = true;
    for (var i = 0; i < days.length; i++) {

        var day = days[i];
        var openKey = day + 'Open';
        var closeKey = day + 'Close';

        var open = momentOrNull(bundle.inputData[openKey]);
        var close = momentOrNull(bundle.inputData[closeKey]);

        if (open && open.isValid() && close && close.isValid()) {
            useDefaultHours = false;
            workingHours[i] = [open.format(hoursFormat), close.format(hoursFormat)];
        }
        else {
            workingHours[i] = null;
        }
    }
    
    var url = UrlAssembler('https://moment-business-days.herokuapp.com' + '/add-working-time')
        .query({
            date: bundle.inputData.date,
            format: bundle.inputData.format,
            amount: bundle.inputData.amount,
            units: bundle.inputData.units,
            outputFormat: bundle.inputData.outputFormat,
            workinghours: useDefaultHours ? undefined : JSON.stringify(workingHours)
        });

    //bundle.inputData.repo
    const responsePromise = z.request({
        method: 'GET',
        url: url.toString()
    });
    return responsePromise.then(response => JSON.parse(response.content));
};

function momentOrNull(string) {
    if (string == null) {
        return null;
    }

    return moment(string);
}

module.exports = {
    key: 'addWorkingTime',
    noun: 'Working Time',

    display: {
        // What the user will see in the Zap Editor when selecting an action
        label: 'Add Working Time',
        description: 'Add an amount of time to a given date.'
    },

    operation: {
        // Data users will be asked to set in the Zap Editor
        inputFields: [
            { key: 'date',           label: 'Date',               type: 'datetime', required: true },
            { key: 'amount',         label: 'Amount of Time',     type: 'number',   required: true },
            { key: 'units',          label: 'Units',              default: 'days',  choices: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'], required: true },
            { key: 'format',         label: 'Input Date Format',  type: 'string',   required: false },
            { key: 'outputFormat',   label: 'Output Date Format', type: 'string',   required: false },
            { key: 'sundayOpen',     label: 'Sunday Open',        type: 'datetime', required: false },
            { key: 'sundayClose',    label: 'Sunday Close',       type: 'datetime', required: false },
            { key: 'mondayOpen',     label: 'Monday Open',        type: 'datetime', required: false },
            { key: 'mondayClose',    label: 'Monday Close',       type: 'datetime', required: false },
            { key: 'tuesdayOpen',    label: 'Tuesday Open',       type: 'datetime', required: false },
            { key: 'tuesdayClose',   label: 'Tuesday Close',      type: 'datetime', required: false },
            { key: 'wednesdayOpen',  label: 'Wednesday Open',     type: 'datetime', required: false },
            { key: 'wednesdayClose', label: 'Wednesday Close',    type: 'datetime', required: false },
            { key: 'thursdayOpen',   label: 'Thursday Open',      type: 'datetime', required: false },
            { key: 'thursdayClose',  label: 'Thursday Close',     type: 'datetime', required: false },
            { key: 'fridayOpen',     label: 'Friday Open',        type: 'datetime', required: false },
            { key: 'fridayClose',    label: 'Friday Close',       type: 'datetime', required: false },
            { key: 'saturdayOpen',   label: 'Saturday Open',      type: 'datetime', required: false },
            { key: 'saturdayClose',  label: 'Saturday Close',     type: 'datetime', required: false }
        ],
        perform: addWorkingTime,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: sample
    }
}
