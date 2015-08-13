define(function(require, exports, module) {
    describe("DatepickerController EventEmitter", function() {
        describe("on change:unitTime event", function() {
            it("should update unitTime in model");
        });

        describe("on select:customDateRange event", function() {
            it("should update model selected start and end dates using datepicker method");
            it("should emit selected:dateRange event");
        });

        describe("on apply:customDateRange event", function() {
            it("should update model applied start and end dates using datepicker method");
            it("should update model selected start and end dates using datepicker method");
            it("should emit applied:customDateRange event");
            it("should emit selected:dateRange event");
        })

        describe("on select:preDefinedDates event", function() {
            describe("when called with last week param", function() {
                it("should update model selected start and end dates using datepicker method");
                it("should emit selected:dateRange event");
            });
            describe("when called with last day param", function() {
                it("should update model selected start and end dates using datepicker method");
                it("should emit selected:dateRange event");
            });
            describe("when called with last month param", function() {
                it("should update model selected start and end dates using datepicker method");
                it("should emit selected:dateRange event");
            });
            describe("when called with last quarter param", function() {
                it("should update model selected start and end dates using datepicker method");
                it("should emit selected:dateRange event");
            });
        })
    })
})
