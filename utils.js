
const UrlAssembler = require('url-assembler');

function getUrl(bundle, path) {

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

function momentOrNull(string) {
    if (string == null) {
        return null;
    }

    return moment(string);
}

module.exports.getUrl = getUrl;
module.exports.momentOrNull = momentOrNull;