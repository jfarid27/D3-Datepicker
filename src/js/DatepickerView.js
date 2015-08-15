define(function(require, exports, module) {
    var Backbone = require("Backbone");

    var DatepickerController = require("./DatepickerController"),
        Datepicker = require("./Datepicker"),
        moment = require("moment");

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
    var datepicker = Datepicker(moment);
    var datepickerController = DatepickerController(datepicker, state);

    var DatepickerView = Backbone.View.extend({
        "events": {
            "click .userSelectingStart": function() {

            },
            "click .userSelectingEnd": function() {

            },
            "click .userSelectingCurrentDay": function() {

            },
            "click .userSelectingCurrentWeek": function() {

            },
            "click .userSelectingCurrentMonth": function() {

            },
            "click .userSelectingCurrentQuarter": function() {

            },
        }
    })

});
