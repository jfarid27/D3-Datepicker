define(function(require, exports, module) {

    var _ = require("underscore"),
        Backbone = require("backbone");

    /* Emitter for user date picking.
     */
    var DatepickerController = function(datepicker, model) {
        var self = this;
        _.extend(self, Backbone.Events);

        self.model = model;

        /* Sets selected dates to last 7 days using model's today property as end date.
         * Emits changed when completed.
         */
        self.on("change:dateRangeLast", function(periodSinceToday, callback) {
            var today = model.get("today");

            var cb = function(enforcedDates) {
                self.model.set("selected", enforcedDates);
            };

            if (periodSinceToday === "week") {
                datepicker.generatePrevious(today, 7, "day", cb);
            } else if (periodSinceToday === "day") {
                datepicker.generatePrevious(today, 1, "day", cb);
            } else if (periodSinceToday === "month") {
                datepicker.generatePrevious(today, 1, "month", cb);
            } else if (periodSinceToday === "quarter") {
                datepicker.generatePrevious(today, 1, "quarter", cb);
            } else if (periodSinceToday === "days30") {
                datepicker.generatePrevious(today, 30, "day", cb);
            }

            if (callback) {
                callback();
            }

            self.trigger("changed:selectedDateRange");
        });

        /* Sets model.applied using model.selected and calls callback. Emits changed
         * when completed.
         */
        self.on("change:applySelectedDateRange", function(callback) {

            self.model.set("applied", self.model.get("selected"));
            if (callback) {
                callback();
            }

            self.trigger("changed:appliedDateRange");
        });

        /* Sets model.selected using given start and end dates as parameters for
         * datepicker.pickDates.
         */
        self.on("change:selectedDateRange", function(startDate, endDate, callback) {

            var currentSelectionType = self.model.get("selectionType");

            var cb = function(enforcedDates) {
                self.model.set("selected", enforcedDates);
            };

            datepicker.pickDates(currentSelectionType, startDate, endDate, cb);

            if (callback) {
                callback();
            }

            self.trigger("changed:selectedDateRange");
        });

        /* Sets selectionType as given selection type and calls callback.
         * Also emits changed when completed.
         */
        self.on("change:selectionType", function(selectionType, callback) {
            self.model.set("selectionType", selectionType);
            if (callback) {
                callback();
            }
            self.trigger("changed:selectionType");
        });

        /* Sets unitTime as given unitTime and calls callback. Also emits changed
         * when completed.
         */
        self.on("change:unitTime", function(unitTime, callback) {
            self.model.set("unitTime", unitTime);
            if (callback) {
                callback();
            }
            self.trigger("changed:unitTime");
        });

    };

    module.exports = DatepickerController;
});
