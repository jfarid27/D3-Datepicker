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
            "today": "2015-08-10",
            "applied": {
                "start": "2015-06-14",
                "end": "2015-07-14"
            },
            "selected": {
                "start": "2015-06-14",
                "end": "2015-07-14"
            },
            "currentlyViewing": ["2015-06-01", "2015-07-01", "2015-08-01"]
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
    var datepickerController = new DatepickerController(datepicker, state);

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

            }
        },
        "initialize": function() {
            this.render();
        },
        "render": function() {
            var self = this;
            self.$el.html(self.template({}));
            self.svg = d3.select(self.el).append('svg').attr({"height": 300, "width": 900}),
                instance = tripCalendar(_, d3, moment, calendar).svg(self.svg);

            instance(options);

            self.emitter = instance.emitter();
            self.emitter.on("dateClick", function(d) {

                if (self.model.get("selectionType") === "start") {
                    datepickerController.trigger("change:selectedDateRange", d, d);
                    self.model.set("selectionType", "end");
                } else if ( self.model.get("selectionType") === "end") {
                    datepickerController.trigger("change:selectedDateRange", self.model.get("selected").start, d);
                    self.model.set("selectionType", "start");
                }

                self.draw();

            });

            self.draw();
        },
        "draw": function() {
            this.emitter.draw(this.model.get("currentlyViewing"), this.model.get("unitTime"), this.model.get("selected"));
        }
    });

    return DatepickerView;

});
