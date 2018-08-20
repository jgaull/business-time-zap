const sample = require('../samples/sample-response');
const UrlAssembler = require('url-assembler');

const addWorkingTime = (z, bundle) => {

    var url = UrlAssembler('https://moment-business-days.herokuapp.com' + '/add-working-time')
        .query({
            date: bundle.inputData.date,
            format: bundle.inputData.format,
            amount: bundle.inputData.amount,
            units: bundle.inputData.units,
            outputFormat: bundle.inputData.outputFormat,
            workinghours: bundle.inputData.workinghours //not implemented
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
            { key: 'date', label: 'Date', required: true },
            { key: 'format', label: 'Input Date Format', required: false },
            { key: 'amount', label: 'Amount of Time', required: false },
            { key: 'units', label: 'Time Units', required: false },
            { key: 'outputFormat', label: 'Output Date Format', required: false },
            { key: 'workingHours', label: 'Business Hours', required: false },
        ],
        perform: addWorkingTime,
        // Sample data that the user will see if they skip the test
        // step in the Zap Editor
        sample: sample
    }
}