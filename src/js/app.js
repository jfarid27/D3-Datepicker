define(function(require, exports, module) {

    var d3 = require("d3");
    var moment = require("moment"),
        _ = require("underscore"),
        calendar = require("src/js/d3-calendar"),
        tripCalendar = require("src/js/triple-d3-calendar");

    var svg = d3.select('body')
        .append('svg')
            .attr({"height": 300, "width": 900});

    var instance = tripCalendar(_, d3, moment, calendar);

    var emitter = instance.emitter();

    emitter.on("dateClick", function(e){
        console.log(e)
    })

    var options = {
        y: {
            min:0,
            max:300
        },
        x: {
            min: 0,
            max: 900
        }
    };

    instance(svg, options)

    emitter.draw(["2015-06-01", "2015-07-01", "2015-08-01"], "day", ["2015-08-01", "2015-08-02", "2015-08-03"])

    return;
});
