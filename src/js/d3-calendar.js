define(function(require, exports, module) {

    var D3Calendar = function(_, d3, moment) {

        //Some useful constants
        var outputFormat = "YYYY-MM-DD",
            daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortDaysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

        //D3 constants
        var xScale = d3.scale.linear()
                .domain([1, 8]),
            yScale = d3.scale.linear()
                .domain([1, 7]),
            eventEmitter = d3.dispatch('dateClick', 'draw'),
            svg, calendarOptions;

        var calendarGroup, calendarTextGroup, calendarRectGroup, calendarLabelDays, calendarLabelMonth;

        var exports = function(selectedSvg, options) {
            svg = selectedSvg;
            calendarOptions = options;

            calendarGroup = svg.append("g").classed("d3Calendar", true);
            calendarTextGroup = calendarGroup.append("g").classed("calendar-text", true);
            calendarRectGroup = calendarGroup.append("g").classed("calendar-rects", true);
            calendarLabelGroup = calendarGroup.append("g").classed("calendar-labels", true);
            calendarLabelMonth = calendarLabelGroup.append("g").classed("calendar-month-label", true);
            calendarLabelDays = calendarLabelGroup.append("g").classed("calendar-days-labels", true);

            return;
        };

        /* Draws calendar on given svg selector.
         */
        eventEmitter.on('draw', function(startDate, selectedDates) {

            //Pretty much making 8 rows where the first row is for labels
            var labelGutter = (calendarOptions.y.max - calendarOptions.y.min) * (1/8)

            xScale.range([calendarOptions.x.min, calendarOptions.x.max]);
            yScale.range([calendarOptions.y.min + labelGutter, calendarOptions.y.max]);

            exports.generateMonthsDays(startDate, function(days){
                exports.computeIndexes(startDate, days, function(indexedDays){
                    exports.drawCalendarTextElements(calendarTextGroup, indexedDays);
                    exports.drawCalendarRectElements(calendarRectGroup, indexedDays, selectedDates);
                });
            });

            exports.drawCalendarMonth(calendarLabelMonth, startDate);
            exports.drawCalendarWeekdays(calendarLabelDays);

        });

        /* Adds calendar month text to upper region of calendar
         */
        exports.drawCalendarMonth = function(svgGroup, startDate) {

            var textOffsetX = .9*(xScale(2) - xScale(1))/2;
            var textOffsetY  = (yScale(2) - yScale(1))/3;

            var monthName = exports.getMonthName(startDate);
            svgGroup.append("text")
                .attr("class", "calendar-month-label")
                .style("text-anchor", "middle")
                .attr("x", function(d, i){
                    return xScale(4) + textOffsetX;
                })
                .attr("y", function(d, i){
                    return textOffsetY;
                })
                .text(monthName);

        };

        /* Adds calendar weekday to upper region of calendar
         */
        exports.drawCalendarWeekdays = function(svgGroup) {
            var textOffsetX = (xScale(2) - xScale(1))/2;
            var textOffsetY  = 2.5*(yScale(2) - yScale(1))/3;

            svgGroup.selectAll("text").data(shortDaysOfWeek).enter()
                .append("text")
                .attr("class", "calendar-day-label")
                .style("text-anchor", "middle")
                .attr("x", function(d, i){
                    return xScale(i+1) + textOffsetX;
                })
                .attr("y", function(d, i){
                    return textOffsetY;
                })
                .text(function(d) { return d });
        };

        /* Returns month name for given ISOString
         */
        exports.getMonthName = function(day) {
            return moment(day).format("MMMM");
        };

        /* Adds all calendar text to given calendar using indexed date objects
         */
        exports.drawCalendarTextElements =  function(svgGroup, indexedDays) {

            var textOffsetX = (xScale(2) - xScale(1))/2;
            var textOffsetY = (yScale(2) - yScale(1))/2;

            svgGroup.selectAll("text").data(indexedDays).enter()
                .append("text")
                    .attr("class", "date-text")
                    .style("text-anchor", "middle")
                    .attr("x", function(d, i){
                        var position = exports.computeRowColumnFromIndex(d.index);
                        return xScale(position.col) + textOffsetX;
                    })
                    .attr("y", function(d, i){
                        var position = exports.computeRowColumnFromIndex(d.index);
                        return yScale(position.row) + textOffsetY;
                    })
                    .attr("day", function(d) { return d.date })
                    .attr("row", function(d) {
                        var position = exports.computeRowColumnFromIndex(d.index);
                        return position.row;
                    })
                    .attr("col", function(d) {
                        var position = exports.computeRowColumnFromIndex(d.index);
                        return position.col;
                    })
                    .text(function(d) {
                        return d.moment.format("D");
                    });
        };

        /* Adds all calendar rects to given calendar using date objects
         */
        exports.drawCalendarRectElements = function(svgGroup, indexedDays, selectedDates) {

            var rectWidth = xScale(2) - xScale(1);
            var rectHeight = yScale(2) - yScale(1);

            svgGroup.selectAll("rect").data(indexedDays).enter()
                .append("rect")
                    .attr("class", "date-rect")
                    .attr("x", function(d, i){
                        var position = exports.computeRowColumnFromIndex(d.index);
                        return xScale(position.col);
                    })
                    .attr("y", function(d, i){
                        var position = exports.computeRowColumnFromIndex(d.index);
                        return yScale(position.row);
                    })
                    .attr("width", rectWidth)
                    .attr("height", rectHeight)
                    .attr("day", function(d) { return d.date })
                    .attr("row", function(d) {
                        var position = exports.computeRowColumnFromIndex(d.index);
                        return position.row;
                    })
                    .style("fill", "white")
                    .style("opacity", function(d){
                        if (_.indexOf(selectedDates, d.date) > -1) {
                            return ".5"
                        }
                        return "0"
                    })
                    .attr("col", function(d) {
                        var position = exports.computeRowColumnFromIndex(d.index);
                        return position.col;
                    })
                    .on('click', function(e) {
                        var self = d3.select(this);
                        eventEmitter.dateClick(self.attr("day"))
                    })

        };

        /* Returns closured eventEmitter.
         */
        exports.emitter = function(){
            return eventEmitter;
        }

        /* Returns computed calendar row and column from given index
         */
        exports.computeRowColumnFromIndex = function(index) {
            return {
                row: Math.floor((index-1 )/ 7) + 1,
                col: ((index-1) % 7) + 1
            }
        };

        /* Returns dateObjs with calendar position index using first of month to generate
         * index offset. Mutates given dateObjs.
         */
        exports.computeIndexes = function(firstOfMonth, dateObjs, cb) {
            var dayOfFirstOfMonth = moment(firstOfMonth).format("dddd"),
            offset = _.indexOf(daysOfWeek, dayOfFirstOfMonth);

            dateObjs.map(function(dateObj) {
                dateObj.index = parseFloat(dateObj.moment.format("D")) + offset
            })

            cb(dateObjs);
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
        };

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

        /* Returns quarterObject when given start ISOString
         */
        exports.quarterGenerator = function(startDate) {
            var q = moment(startDate).startOf("quarter");
            var interpolatedMonths = [0, 1, 2].reduce(function(acc, month) {
                var inter = moment(startDate).startOf("quarter")
                    .add(month, "month").format("MMM");
                acc.push(inter);
                return acc;
            }, []);

            return {
                "months": interpolatedMonths,
                "year": q.format("YYYY")
            };
        };

        /* Returns monthObject when given start ISOString
         */
        exports.monthGenerator = function(startDate) {
            var m = moment(startDate);

            return {
                "month": m.startOf("month").format("MMM"),
                "year": m.format("YYYY")
            };
        };

        /* Getter setter for short day of week string names
         */
        exports.shortDaysOfWeek = function() {
            if (arguments.length) {
                shortDaysOfWeek = arguments[0];
                return exports;
            }
            return shortDaysOfWeek;
        }

        /* Getter setter for day of week string names
         */
        exports.daysOfWeek = function() {
            if (arguments.length) {
                daysOfWeek = arguments[0];
                return exports;
            }
            return daysOfWeek;
        }
        return exports;
    };

    module.exports = D3Calendar
});
