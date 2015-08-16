define(function(require, exports, module) {

    var tripD3Calendar = function(_, d3, moment, Calendar) {
        var left = Calendar(_, d3, moment),
            right = Calendar(_, d3, moment),
            center = Calendar(_, d3, moment);

        var exports = function(svg, options) {
            left(svg, exports.optionsTransformer("left", options))
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

        return exports;

    };

    return tripD3Calendar;
});
