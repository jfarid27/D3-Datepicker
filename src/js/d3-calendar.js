define(function(require, exports, module) {

    var D3Calendar = function(_, d3, moment) {

        //Some useful constants
        var outputFormat = "YYYY-MM-DD",
            daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        var exports = function() {
            return;
        };

        /* Takes array of date objects generated by generateMonthsDays and returns
         * hash table of days grouped by day of the week
         */
        exports.groupByDay = function(dateObjs, cb) {

            var res = _.object(daysOfWeek, daysOfWeek.map(function() { return []}));

            var query = dateObjs.reduce(function(acc, next) {
                acc[next.moment.format("dddd")].push(next);
                return acc
            }, res);

            cb(query);
        }

        /* Takes ISOString for first of the month and generates array of date
         * objects representing each day of the month.
         */
        exports.generateMonthsDays = function(startDate, cb, acc) {
            var startingDay = moment(startDate),
                nextDay = moment(startDate).add(1, 'days'),
                lastDayOfMonth = moment(startDate).endOf("month").startOf("day"),
                accumulator = acc ? acc : [];

            var startDateObj = {
                date: startingDay.format(outputFormat),
                moment: startingDay
            };

            // If we're on the last day of the month
            if (startingDay.isSame(lastDayOfMonth)){
                cb(accumulator.concat([startDateObj]));
                return;
            }
            exports.generateMonthsDays(nextDay.format(outputFormat), cb, accumulator.concat([startDateObj]));
        };

         return exports;
    };

    module.exports = D3Calendar
});
