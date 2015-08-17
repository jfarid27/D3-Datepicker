define(function(require, exports, module) {

    var tripD3Calendar = function(_, d3, moment, Calendar) {
        var left = Calendar(_, d3, moment),
            right = Calendar(_, d3, moment),
            center = Calendar(_, d3, moment);

        var eventEmitter = d3.dispatch('draw', 'clean', 'dateClick');

        var leftEmitter = left.emitter(),
            rightEmitter = right.emitter(),
            centerEmitter = center.emitter();

        var emitters = [leftEmitter, centerEmitter, rightEmitter];

        var svg;

        var exports = function(options) {
            left(svg, exports.optionsTransformer("left", options));
            right(svg, exports.optionsTransformer("right", options));
            center(svg, exports.optionsTransformer("center", options));

            eventEmitter.on("draw", function(months, type, selectedDates) {

                if (type === "day") {
                    months.map(function(month, i) {
                        emitters[i].drawDay(month, selectedDates);
                        emitters[i].on("dateClick", function(date) {
                            eventEmitter.dateClick(date);
                        });
                    });
                }

                if (type === "month") {
                    months.map(function(month, i) {
                        emitters[i].drawMonth(month, selectedDates);
                        emitters[i].on("dateClick", function(date) {
                            eventEmitter.dateClick(date);
                        });
                    })
                }

            });

            eventEmitter.on("clean", function() {
                svg.selectAll("*").remove();
            });

        };

        /* Transforms given options into split options based on type
         */
        exports.optionsTransformer = function(type, options) {

            var transformed;
            if (type === "left") {
                transformed = _.extend({}, options, {
                    x: {
                        min: options.x.min,
                        max: options.x.max / 3
                    }
                });
            } else if (type === "center") {
                transformed = _.extend({}, options, {
                    x: {
                        min: options.x.max / 3,
                        max: 2 * options.x.max / 3
                    }
                });
            } else if (type === "right") {
                transformed = _.extend({}, options, {
                    x: {
                        min: 2 * options.x.max / 3,
                        max: options.x.max
                    }
                });
            }

            return transformed
        };

        /* Returns closured eventEmitter.
         */
        exports.emitter = function() {
            return eventEmitter;
        };

        exports.svg = function() {
            if (arguments.length > 0) {
                svg = arguments[0];
                return exports;
            }

            return svg
        };

        return exports;

    };

    return tripD3Calendar;
});
