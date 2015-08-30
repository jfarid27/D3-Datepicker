define(function(require, exports, module) {

    var D3Calendar = function(_, d3, moment) {

        //Some useful constants
        var outputFormat = "YYYY-MM-DD",
            daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortDaysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
            selectedDateColor = "#7fa";

        //D3 constants
        var xScale = d3.scale.linear()
                .domain([1, 8]),
            yScale = d3.scale.linear()
                .domain([1, 7]),
            eventEmitter = d3.dispatch("dateClick", "drawDay", "drawMonth", "drawQuarter"),
            svg, calendarOptions;

        var calendarGroup, calendarTextGroup, calendarRectGroup,
            calendarLabelDays, calendarLabelMonth, calendarLargeTextGroup,
            calendarIconsGroup, calendarLabelQuarterMonth;

        var exports = function(selectedSvg, options) {
            svg = selectedSvg;
            calendarGroup = svg.append("g").classed("d3Calendar", true);
            calendarOptions = options;
            return;
        };

        /* Extended momemt function to query for moment in between two set dates inclusively
         */
        exports.isBetweenInc = function(moment, start, end) {
            var isBetween = moment.isBetween(start, end);
            var isOnEdge = moment.isSame(start) || moment.isSame(end);
            var isInclusivelyBetween = isBetween || isOnEdge;
            return isInclusivelyBetween;
        }

        /* Draws calendar groups on set svg for day visualization
         */
        exports.setGroupsDay = function() {
            calendarGroup.selectAll("*").remove();
            calendarTextGroup = calendarGroup.append("g").classed("calendar-text", true);
            calendarRectGroup = calendarGroup.append("g").classed("calendar-rects", true);
            calendarLabelGroup = calendarGroup.append("g").classed("calendar-labels", true);
            calendarLabelMonth = calendarLabelGroup.append("g").classed("calendar-month-label", true);
            calendarLabelDays = calendarLabelGroup.append("g").classed("calendar-days-labels", true);
        };

        /* Draws calendar groups on set svg for month visualization
         */
        exports.setGroupsMonth = function() {
            calendarGroup.selectAll("*").remove();
            calendarRectGroup = calendarGroup.append("g").classed("calendar-rects", true);
            calendarLargeTextGroup = calendarGroup.append("g").classed("calendar-large-text", true);
            calendarIconsGroup = calendarGroup.append("g").classed("calendar-icons", true);
        };

        /* Draws calendar groups on set svg for quarter visualization
         */
        exports.setGroupsQuarter = function() {
            calendarGroup.selectAll("*").remove();
            calendarRectGroup = calendarGroup.append("g").classed("calendar-rects", true);
            calendarLargeTextGroup = calendarGroup.append("g").classed("calendar-large-text", true);
            calendarIconsGroup = calendarGroup.append("g").classed("calendar-icons", true);
            calendarLabelQuarterMonth = calendarGroup.append("g").classed("calendar-large-months", true)
        }

        /* Draws quarter element on given svg selector
         */
        eventEmitter.on("drawQuarter", function(startDate, selectedDates) {
            exports.setGroupsQuarter();

            var quarterObj = exports.quarterGenerator(startDate),
                quarterText = exports.quarterText(quarterObj);

            xScale.range([calendarOptions.x.min, calendarOptions.x.max]);
            yScale.range([calendarOptions.y.min, calendarOptions.y.max]);

            exports.drawLargeRect(calendarRectGroup, startDate, selectedDates);
            exports.drawLargeTextCentered(calendarLargeTextGroup, quarterText, startDate, selectedDates);
            exports.addTripleMonthQuarter(calendarLabelQuarterMonth, quarterObj.months, startDate, selectedDates);
            exports.addTripleMonthQuarterIcons(calendarIconsGroup, quarterObj.months, startDate, selectedDates)
        });

        /* Draws month element on given svg selector
         */
        eventEmitter.on("drawMonth", function(startDate, selectedDates) {
            exports.setGroupsMonth();

            var monthObj = exports.monthGenerator(startDate),
                monthText = monthObj.month + " " + monthObj.year;

            xScale.range([calendarOptions.x.min, calendarOptions.x.max]);
            yScale.range([calendarOptions.y.min, calendarOptions.y.max]);

            exports.drawLargeRect(calendarRectGroup, startDate, selectedDates);
            exports.drawLargeTextCentered(calendarLargeTextGroup, monthText, startDate, selectedDates);
            exports.drawMonthCalendarIcon(calendarIconsGroup, startDate, selectedDates);
        });

        /* Draws day calendar on given svg selector.
         */
        eventEmitter.on('drawDay', function(startDate, selectedDates) {
            exports.setGroupsDay();

            //Pretty much making 8 rows where the first row is for labels
            var labelGutter = (calendarOptions.y.max - calendarOptions.y.min) * (1/8);

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

        /* Adds three month objects for quarters to given svg group.
         */
        exports.addTripleMonthQuarter = function(svgGroup, months, selectedDates) {

            var xTextBox = (calendarOptions.x.max - calendarOptions.x.min) / 3,
                xTextOffset = xTextBox / 2;


            svgGroup.selectAll("text").data(months).enter()
                .append("text")
                    .attr("class", function(d) {
                        var output = "calendar-months-large";
                        return output;
                    })
                    .style("text-anchor", "middle")
                    .attr("x", function(d, i){
                        return calendarOptions.x.min + ( (i + 1) * xTextBox ) - xTextOffset;
                    })
                    .attr("y", function(d, i){
                        return 2 * calendarOptions.y.max / 3;
                    })
                    .text(function(d) {
                        return d
                    });
        };

        /* Adds three month objects for quarters to given svg group.
         */
        exports.addTripleMonthQuarterIcons = function(svgGroup, months, selectedDates) {

            var xTextBox = (calendarOptions.x.max - calendarOptions.x.min) / 3,
                xTextOffset = xTextBox / 2;


            svgGroup.selectAll("i").data(months).enter()
                .append("i")
                    .attr("class", function(d) {
                        var output = "fa fa-calendar fa-lg";
                        if (_.indexOf(selectedDates, d) > -1){
                            output = "fa fa-calendar fa-lg selected";
                        }
                        return output
                    });
        };

        /* Adds month calendar icon to given svg group
         */
        exports.drawMonthCalendarIcon = function(svgGroup, startDate, selectedDates) {
            svgGroup.append("i")
                .attr("class", function(d) {
                    var output = "fa fa-calendar fa-lg";
                    if (_.indexOf(selectedDates, startDate) > -1){
                        output = "fa fa-calendar fa-lg selected";
                    }
                    return output;
                });
        };

        /* Draws large rect on given svg selector. Used for selections on months and quarters
         */
        exports.drawLargeRect = function(svgGroup, startDate, selectedDates) {
            svgGroup
                .append("rect")
                    .attr("class",  function(d){
                        if ( exports.isBetweenInc(d.moment, selectedDates.start, selectedDates.end) ) {
                            return "date-rect selected"
                        }
                        return "date-rect"
                    })
                    .attr("x", calendarOptions.x.min)
                    .attr("y", calendarOptions.y.min)
                    .attr("width", calendarOptions.x.max - calendarOptions.x.min)
                    .attr("height", calendarOptions.y.max - calendarOptions.y.min)
                    .style("fill", selectedDateColor)
                    .style("opacity", function(d){
                        if ( exports.isBetweenInc(d.moment, selectedDates.start, selectedDates.end) ) {
                            return ".5"
                        }
                        return "0"
                    })
                    .on('click', function(e) {
                        var self = d3.select(this);
                        eventEmitter.dateClick(startDate)
                    });
        }

        /* Adds large centered text for month and quarter visualization
         */
        exports.drawLargeTextCentered = function(svgGroup, text, startDate, selectedDates) {

            svgGroup.append("text")
                .attr("class", function(d) {
                    var output = "calendar-large-label";
                    if (_.indexOf(selectedDates, startDate) > -1){
                        output = "calendar-large-label selected";
                    }
                    return output;
                })
                .attr("class", "calendar-large-label")
                .style("text-anchor", "middle")
                .attr("x", function(d, i){
                    return calendarOptions.x.max - (calendarOptions.x.max - calendarOptions.x.min) / 2;
                })
                .attr("y", function(d, i){
                    return .9 * calendarOptions.y.max / 3;
                })
                .text(text);
        };

        /* Adds calendar month text to upper region of calendar
         */
        exports.drawCalendarMonth = function(svgGroup, startDate) {

            var textOffsetX = (xScale(2) - xScale(1))/2;
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
                    .attr("class",  function(d){

                        if ( exports.isBetweenInc(d.moment, selectedDates.start, selectedDates.end) ) {
                            return "date-rect selected"
                        }
                        return "date-rect"
                    })
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
                    .style("fill", selectedDateColor)
                    .style("opacity", function(d){
                        if ( exports.isBetweenInc(d.moment, selectedDates.start, selectedDates.end) ) {
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
                    });

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
                "moment": q,
                "quarter": q.format("Q"),
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
        };

        /* Mini-transformer for quarter text. Useful to set using merchant profile
         * data if quarter start month isn't the default moment quarters
         */
        exports.quarterText = function(quarterObj) {
            return "Q" + quarterObj.quarter + " " + quarterObj.moment.format("YYYY");
        };

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
