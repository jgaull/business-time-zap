
const UrlAssembler = require('url-assembler');
const moment = require('moment');

const FIELD_TYPE_INPUT_FORMAT = 0;
const FIELD_TYPE_OUTPUT_FORMAT = 1;

function getUrl(bundle, path, z) {

    let workingHours = {};
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const outputBusinessHoursFormat = 'HH:mm:ss';
    const inputBusinessHoursFormat = bundle.inputData.businessHoursFormat;
    let useDefaultHours = true;
    for (var i = 0; i < days.length; i++) {

        const day = days[i];
        let hours = null;
        let hoursString = bundle.inputData[day];
        if (hoursString) {

            hoursString.replace(/\s/g, '');
            hours = hoursString.split('-');
            const open = momentOrNull(hours[0], inputBusinessHoursFormat);
            const close = momentOrNull(hours[1], inputBusinessHoursFormat);
            
            if (open && open.isValid() && close && close.isValid()) {
                useDefaultHours = false;
                hours = [open.format(outputBusinessHoursFormat), close.format(outputBusinessHoursFormat)];
            }
        }

        workingHours[i] = hours;
    }

    workingHours = useDefaultHours ? undefined : workingHours;

    let holidays = bundle.inputData.holidays;
    if (holidays !== undefined) {
        holidays = holidays.join(',');
    }
        
    return UrlAssembler(process.env.API_URL + path)
        .query({
            date: bundle.inputData.date,
            format: bundle.inputData.format,
            amount: bundle.inputData.amount,
            units: bundle.inputData.units,
            outputFormat: bundle.inputData.outputFormat,
            workinghours: JSON.stringify(workingHours),
            holidays: holidays
        });
}

function getWorkingHoursFields() {
    const helpText = 'Write as `open-close`. Leave blank if the business is closed on ';
    return {
        key: 'businesshours', label: 'Business Hours', children: [
            { key: 'businessHoursFormat', label: 'Format', choices: getTimeFormats(), helpText: 'Write hours as `9:00am-5:00pm` or `9:00-17:00` depending on the format chosen below. Leave all days blank to use default business hours (9am-5pm M-F)'},
            { key: 'sunday', label: 'Sunday', type: 'datetime', required: false, helpText: helpText + 'Sundays' },
            { key: 'monday', label: 'Monday', type: 'datetime', required: false, helpText: helpText + 'Mondays' },
            { key: 'tuesday', label: 'Tuesday', type: 'datetime', required: false, helpText: helpText + 'Tuesdays' },
            { key: 'wednesday', label: 'Wednesday', type: 'datetime', required: false, helpText: helpText + 'Wednesdays' },
            { key: 'thursday', label: 'Thursday', type: 'datetime', required: false, helpText: helpText + 'Thursdays' },
            { key: 'friday', label: 'Friday', type: 'datetime', required: false, helpText: helpText + 'Fridays' },
            { key: 'saturday', label: 'Saturday', type: 'datetime', required: false, helpText: helpText + 'Saturdays' },
        ]
    }
}

function getTimeFormats() {
    return {'h:mma':'1:00pm','H:mm':'13:00'}
}

function getDateFormats() {
    return {
        'ddd MMM DD HH:mmss Z YYYY': 'Sun Jan 22 23:04:05 -0000 2006',
        'MMMM DD YYYY HH:mm:ss': 'January 22 2006 23:04:05',
        'MMMM DD YYYY': 'January 22 2006',
        'MMM DD YYYY': 'Jan 22 2006',
        'YYYY-MM-DDTHH:mm:ssZ': '2006-01-22T23:04:05-0000',
        'YYYY-MM-DD HH:mm:ss Z': '2006-01-22 23:04:05 -0000',
        'YYYY-MM-DD': '2006-01-22',
        'MM-DD-YYYY': '01-22-2006',
        'MM/DD/YYYY': '01/22/2006',
        'MM/DD/YY': '01/22/06',
        'DD-MM-YYYY': '22-01-2006',
        'DD/MM/YYYY': '22/01/2006',
        'DD/MM/YY': '22/01/06',
        'X': '1137971045'
    };
}

function getDateFormatField(type) {

    let key = 'format';
    let label = 'Input Date Format';
    let helpText = 'We will do our best to automatically figure out the format of your input date. If we incorrectly interpret the format, set this to tell us the correct format.';

    if (type == FIELD_TYPE_OUTPUT_FORMAT) {
        key = 'outputFormat';
        label = 'Output Date Format';
        helpText = 'The format that the date should be converted to. [Date formatting help](https://momentjs.com/docs/#/displaying/format/)';
    }

    return { 
        key: key,
        label: label,
        choices: getDateFormats(), 
        required: false,
        helpText: helpText
    };
}

function getHolidaysField() {
    return {
        key: 'holidays',
        list: true,
        type: 'string',
        helpText: 'Dates must be formatted as `YYYY-MM-DD` (ex. 2017-01-31). The `*` can be used to represent any year, month, or day (ex. `*-01-01` will make January 1st a holiday every year)',
        label: 'Holidays'
    };
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
module.exports.getTimeFormats = getTimeFormats;
module.exports.getDateFormats = getDateFormats;
module.exports.getDateFormatField = getDateFormatField;
module.exports.getHolidaysField = getHolidaysField;

module.exports.FIELD_TYPE_INPUT_FORMAT = FIELD_TYPE_INPUT_FORMAT;
module.exports.FIELD_TYPE_OUTPUT_FORMAT = FIELD_TYPE_OUTPUT_FORMAT;