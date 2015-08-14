define(function(require, exports, module) {

    var _ = require("underscore"),
        Backbone = require("backbone");

    var DatepickerController = function(datepicker, model) {
        var self = this;
        _.extend(self, Backbone.Events);

        self.model = model;

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
