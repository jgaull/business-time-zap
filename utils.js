
const UrlAssembler = require('url-assembler');
const moment = require('moment');

function getUrl(bundle, path, z) {

    var workingHours = {};

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var outputBusinessHoursFormat = 'HH:mm:ss';
    var inputBusinessHoursFormat = bundle.inputData.businessHoursFormat;
    z.console.log('inputData: ' + JSON.stringify(bundle.inputData));
    var useDefaultHours = true;
    for (var i = 0; i < days.length; i++) {

        var day = days[i];
        var hoursString = bundle.inputData[day];

        if (hoursString) {

            hoursString.replace(/\s/g, '');
            var hours = hoursString.split('-');

            var open = momentOrNull(hours[0], inputBusinessHoursFormat);
            var close = momentOrNull(hours[1], inputBusinessHoursFormat);

            if (open && open.isValid() && close && close.isValid()) {
                useDefaultHours = false;
                workingHours[i] = [open.format(outputBusinessHoursFormat), close.format(outputBusinessHoursFormat)];
            }
            else {
                workingHours[i] = null;
            }
        }
    }
    z.console.log('workingHours: ' + JSON.stringify(workingHours));
    workingHours = useDefaultHours ? undefined : workingHours;
    
    var url = UrlAssembler(process.env.API_URL + path)
        .query({
            date: bundle.inputData.date,
            format: bundle.inputData.format,
            amount: bundle.inputData.amount,
            units: bundle.inputData.units,
            outputFormat: bundle.inputData.outputFormat,
            workinghours: JSON.stringify(workingHours)
        });

    return url;
}

function getWorkingHoursFields() {
    var helpText = 'Written as `9:00am-5:00pm` or `9:00-17:00` depending on the format chosen above. Leave blank if the business is closed. Leave all days blank to use default business hours (9am-5pm M-F).';
    return {
        key: 'businesshours', label: 'Business Hours', children: [
            { key: 'businessHoursFormat', label: 'Format', choices: {'h:mma':'1:00pm','H:mm':'13:00'}},
            { key: 'sunday', label: 'Sunday', type: 'datetime', required: false, helpText: helpText },
            { key: 'monday', label: 'Monday', type: 'datetime', required: false },
            { key: 'tuesday', label: 'Tuesday', type: 'datetime', required: false },
            { key: 'wednesday', label: 'Wednesday', type: 'datetime', required: false },
            { key: 'thursday', label: 'Thursday', type: 'datetime', required: false },
            { key: 'friday', label: 'Friday', type: 'datetime', required: false },
            { key: 'saturday', label: 'Saturday', type: 'datetime', required: false }
        ]
    }
}

function momentOrNull(string, format) {
    if (string == null) {
        return null;
    }

    return moment(string, format);
}

module.exports.getUrl = getUrl;
module.exports.momentOrNull = momentOrNull;
module.exports.getWorkingHoursFields = getWorkingHoursFields;