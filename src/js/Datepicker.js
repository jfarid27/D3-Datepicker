define(function(require, exports, module) {

    var Datepicker = function(moment) {
        var self = this,
            outputFormat = "YYYY-MM-DD";

        var exports = function() {
            return;
        };

        /* Returns ISOString object enforcing startDate precedes endDate when given
         * start and end ISOStrings. Transforms returned start and end dates based on
         * pickType. 
         */
        exports.pickDates = function(pickType, start, end, cb) {
            var start = moment(start),
                end = moment(end);

            var shouldReduce, response = {};
            if (pickType === 'start') {
                // Check if start is after end date
                shouldReduce = (moment.min(start, end).format(outputFormat) === end.format(outputFormat));
                response.start = start.format(outputFormat);

                // If start is after end date, return start and end on start day
                response.end = (!shouldReduce) ? end.format(outputFormat) : start.format(outputFormat);
            } else {
                // Check if end is before start date
                shouldReduce = (moment.min(start, end).format(outputFormat) === end.format(outputFormat));
                response.end = end.format(outputFormat);

                // If start is after end date, return start and end on end day
                response.start = (!shouldReduce) ? start.format(outputFormat) : end.format(outputFormat);
            }

            cb(response)


        };

        /* Computes new start and end dates for numPrev days/months/quarters before given
         * endDate in ISOString format.
         */
        exports.generatePrevious = function(endDate, numPrev, type, cb) {
            var curr = moment(endDate);
            var newDate = moment(endDate).subtract(numPrev, type);

            cb({
                start: newDate.format(outputFormat),
                end: curr.format(outputFormat)
            });
        };

        return exports;
    }

    return Datepicker;

});
