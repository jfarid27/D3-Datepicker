define(function(require, exports, module) {

    var d3 = require("d3");
    var moment = require("moment"),
        _ = require("underscore"),
        calendar = require("src/js/d3-calendar"),
        tripCalendar = require("src/js/triple-d3-calendar");

    var svg1 = d3.select('body')
        .append('svg')
            .attr({"height": 300, "width": 900});

    var svg2 = d3.select('body')
        .append('svg')
            .attr({"height": 300, "width": 900});

    var svg3 = d3.select('body')
        .append('svg')
            .attr({"height": 300, "width": 900});

    var instance1 = tripCalendar(_, d3, moment, calendar).svg(svg1);
    var instance2 = tripCalendar(_, d3, moment, calendar).svg(svg2);
    var instance3 = tripCalendar(_, d3, moment, calendar).svg(svg3);

    var emitter1 = instance1.emitter();
    var emitter2 = instance2.emitter();
    var emitter3 = instance3.emitter();

    emitter1.on("dateClick", function(e){
        console.log(e)
    })

    emitter2.on("dateClick", function(e){
        console.log(e)
    })

    emitter3.on("dateClick", function(e){
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

    instance1(options);
    instance2(options);
    instance3(options);

    emitter1.draw(["2015-06-01", "2015-07-01", "2015-08-01"], "day", ["2015-08-01", "2015-08-02", "2015-08-03"]);
    emitter2.draw(["2015-06-01", "2015-07-01", "2015-08-01"], "month", ["2015-07-01"]);
    emitter3.draw(["2015-01-01", "2015-04-01", "2015-07-01"], "quarter", ["2015-04-01"]);


    return;
});
