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

            cb(response);
        };

        /* Computes new start and end ISOStrings for a specified time period type up to a
         * given date. Useful for specifying "current month" or "current quarter" start
         * and end dates.
         */
        exports.current = function(type, endDate, cb) {
            var curr = moment(endDate),
                start = moment(endDate).startOf(type);

            cb({
                start: start.format(outputFormat),
                end: curr.format(outputFormat)
            })
        };

        /* Computes new start and end dates for numPrev days/months/quarters before given
         * endDate in ISOString format. Useful for generating start and end moments using
         * common ranges from today like "30 days from today".
         */
        exports.generatePrevious = function(endDate, numPrev, type, cb) {
            var curr = moment(endDate);
            var newDate = moment(endDate).subtract(numPrev, type);

            cb({
                start: newDate.format(outputFormat),
                end: curr.format(outputFormat)
            });
        };

        /* Computes list of month ISOStrings for numPrev days/months/quarters before
         * given endDate. Useful for generating Month strings within given range to
         * make calendar objects.
         */
        exports.generateCalendarDates = function(endDate, numPrev, type, cb) {

            var output = [], j;

            var j = moment(endDate).startOf(type);
            var output = [j.format(outputFormat)];
            console.log(output)
            for (var i = 1; i < numPrev; i++) {
                j.subtract(1, type);
                output = [j.format(outputFormat)].concat(output);
                console.log(output)
            }

            cb(output);
        }

        /* Getter/Setter for outputFormat
         */
         exports.outputFormat = function() {
             if (arguments.length > 0) {
                 outputFormat = arguments[0];
                 return exports;
             }

             return outputFormat;
         };

        return exports;
    }

    return Datepicker;

});
