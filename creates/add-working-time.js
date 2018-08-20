const sample = require('../samples/sample-response');
const UrlAssembler = require('url-assembler');
const moment = require('moment');

const addWorkingTime = (z, bundle) => {

    var workingHours = {};

    z.console.log(JSON.stringify(bundle.inputData));

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var hoursFormat = 'HH:mm:ss';
    var useDefaultHours = true;
    for (var i = 0; i < days.length; i++) {

        var day = days[i];
        var openKey = 'open' + i;
        var closeKey = 'close' + i;

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
        // Defining the interaction with your API endpoint. The bundle
        // parameter holds data input and authentication information
        // from the Zap:
        url: url.toString()
    });
    return responsePromise
        .then(response => JSON.parse(response.content));
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
            { key: 'date',         label: 'Date',               type: 'datetime', required: true },
            { key: 'format',       label: 'Input Date Format',  type: 'string',   required: false },
            { key: 'amount',       label: 'Amount of Time',     type: 'number',   required: false },
            { key: 'units',        choices: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'],    required: false },
            { key: 'outputFormat', label: 'Output Date Format', type: 'string',   required: false },
            {
                key: "sunday",
                label: "Sunday Business Hours",
                children: [
                    { key: 'open0', label: 'Open' , type: 'datetime' },
                    { key: 'close0', label: 'Close', type: 'datetime' },
                ]
            },
            {
                key: "monday",
                label: "Monday Business Hours",
                children: [
                    { key: 'open1', label: 'Open', type: 'datetime' },
                    { key: 'close1', label: 'Close', type: 'datetime' },
                ]
            },
            {
                key: "tuesday",
                label: "Tuesday Business Hours",
                children: [
                    { key: 'open2', label: 'Open', type: 'datetime' },
                    { key: 'close2', label: 'Close', type: 'datetime' },
                ]
            },
            {
                key: "wednesday",
                label: "Wednesday Business Hours",
                children: [
                    { key: 'open3', label: 'Open', type: 'datetime' },
                    { key: 'close3', label: 'Close', type: 'datetime' },
                ]
            },
            {
                key: "thursday",
                label: "Thursday Business Hours",
                children: [
                    { key: 'open4', label: 'Open', type: 'datetime' },
                    { key: 'close4', label: 'Close', type: 'datetime' },
                ]
            },
            {
                key: "friday",
                label: "Friday Business Hours",
                children: [
                    { key: 'open5', label: 'Open', type: 'datetime' },
                    { key: 'close5', label: 'Close', type: 'datetime' },
                ]
            },
            {
                key: "saturday",
                label: "Saturday Business Hours",
                children: [
                    { key: 'open6', label: 'Open', type: 'datetime' },
                    { key: 'close6', label: 'Close', type: 'datetime' },
                ]
            },
        ],
        perform: addWorkingTime,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: sample
    }
}
//choices: [{ seconds: 'Seconds' }, { minutes: 'Minutes' }, { hours: 'Hours' }, { days: 'Days' }, { weeks: 'Weeks' }, { months: 'Months' }, { years: 'Years' }]