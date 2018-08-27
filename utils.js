
const UrlAssembler = require('url-assembler');
const moment = require('moment');

function getUrl(bundle, path, z) {

    var workingHours = {};

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var hoursFormat = 'HH:mm:ss';
    var useDefaultHours = true;
    for (var i = 0; i < days.length; i++) {

        var day = days[i];
        var hoursString = bundle.inputData[day];

        if (hoursString) {

            hoursString.replace(/\s/g, '');
            var hours = hoursString.split('-');

            var format = 'HH:mm';
            var open = momentOrNull(hours[0], format);
            var close = momentOrNull(hours[1], format);

            if (open && open.isValid() && close && close.isValid()) {
                useDefaultHours = false;
                workingHours[i] = [open.format(hoursFormat), close.format(hoursFormat)];
            }
            else {
                workingHours[i] = null;
            }
        }
    }
    
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
    return {
        key: 'businesshours', label: 'Business Hours', children: [
            { key: 'sunday', label: 'Sunday', type: 'datetime', required: false },
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