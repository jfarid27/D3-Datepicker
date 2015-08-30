define(function(require, exports, module) {
    var Backbone = require("backbone");

    var DatepickerController = require("./DatepickerController"),
        Datepicker = require("./Datepicker"),
        moment = require("moment"),
        calendarTemplate = require("text!src/template/calendarTemplate.jst"),
        calendar = require("src/js/d3-calendar"),
        tripCalendar = require("src/js/triple-d3-calendar");

    var environment = Backbone.Model.extend(),
        state = new environment({
            "unitTime": "day",
            "selectionType": "start",
            "today": "2014-06-10",
            "applied": {
                "start": "2014-01-01",
                "end": "2014-02-01"
            },
            "selected": {
                "start": "2014-02-01",
                "end": "2014-03-01"
            }
        });

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

    var datepicker = Datepicker(moment);
    var datepickerController = DatepickerController(datepicker, state);

    var DatepickerView = Backbone.View.extend({
        "el": ".datepicker",
        "template": _.template(calendarTemplate),
        "model": state,
        "events": {
            "click .userSelectingStart": function() {

            },
            "click .userSelectingEnd": function() {

            },
            "click .userSelectingCurrentDay": function() {

            },
            "click .userSelectingCurrent30Days": function() {

            },
            "click .userSelectingCurrentWeek": function() {

            },
            "click .userSelectingCurrentMonth": function() {

            },
            "click .userSelectingCurrentQuarter": function() {

            },
            "click .userSelectingUnitTimeByDay": function() {

            },
            "click .userSelectingUnitTimeByMonth": function() {

            },
            "click .userSelectingUnitTimeByQuarter": function() {

            },
            "click .user": function() {

            }
        },
        "initialize": function() {
            this.render();
        },
        "render": function() {
            this.$el.html(this.template({}));
            this.svg = d3.select(this.el).append('svg').attr({"height": 300, "width": 900}),
                instance = tripCalendar(_, d3, moment, calendar).svg(this.svg);

            instance(options);

            var emitter = instance.emitter();

            emitter.draw(["2015-06-01", "2015-07-01", "2015-08-01"], this.model.get("unitTime"), []);
        }
    });

    return DatepickerView;

});
