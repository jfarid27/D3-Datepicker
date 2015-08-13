define(function(require, exports, module) {

    var Datepicker = function(moment) {
        var self = this,
            outputFormat = "YYYY-MM-DD";

        var exports = function() {
            return;
        }

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
