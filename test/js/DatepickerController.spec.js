define(function(require, exports, module) {
    describe("DatepickerController EventEmitter integration tests", function() {

        var DatepickerController = require("src/js/DatepickerController");

        var backbone = require("backbone");

        var controller, model, datepicker, MockDatePicker;
        beforeEach(function() {

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

            MockDatePicker = function() {
                var self = this;

                self.$args = {};

                self.pickDates = function() {
                    self.$args.pickDates = arguments;
                    arguments[3]("pickDatesResponse");
                };

                self.generatePrevious = function() {
                    self.$args.generatePrevious = arguments;
                    arguments[3]("generatePreviousResponse")
                };

            };

            datepicker = new MockDatePicker();

            model = backbone.Model.extend({
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

            controller = new DatepickerController(datepicker, new model());
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        });

        describe("on change:selectionType event", function() {

            var selectionType
            beforeEach(function() {
                selectionType = "mockSelectionType";
            });

            it("should update selectionType in model", function(done) {
                var cb = function() {
                    expect(controller.model.get("selectionType")).toBe("mockSelectionType");
                    done();
                };

                controller.trigger("change:selectionType", "mockSelectionType", cb);
            });

            it("should emit changed:selectionType", function(done) {
                controller.on("changed:selectionType", done);
                controller.trigger("change:selectionType", "mockSelectionType");
            });

        });

        describe("on change:unitTime event", function() {

            var newUnitTime;
            beforeEach(function() {
                newUnitTime = "newUnitTime";
            });

            it("should update unitTime in model", function(done) {
                var cb = function() {
                    expect(controller.model.get("unitTime")).toBe("newUnitTime");
                    done();
                };
                controller.trigger("change:unitTime", newUnitTime, cb);
            });
            it("should emit changed:unitTime event", function(done) {

                controller.on("changed:unitTime", done)

                controller.trigger("change:unitTime", newUnitTime);
            });
        });

        describe("on change:selectedDateRange event", function() {

            var newDateRange;
            beforeEach(function() {
                newDateRange = "mockDateRange";
            });

            it("should update model selected start and end dates using datepicker method", function(done) {
                var cb = function() {
                    expect(datepicker.$args.pickDates[0]).toBe("mockDateRange");
                    expect(controller.model.get("selected")).toBe("pickDatesResponse");
                    done();
                };
                controller.trigger("change:selectedDateRange", newDateRange, cb);
            });
            it("should emit changed:selectedDateRange event", function(done) {

                controller.on("changed:selectedDateRange", done)
                controller.trigger("change:selectedDateRange", newDateRange);
            });
        });

        describe("on change:applySelectedDateRange event", function() {
            it("should update model applied start and end with selected", function(done) {
                var cb = function() {
                    expect(controller.model.get("applied").start).toBe("2014-02-01");
                    expect(controller.model.get("applied").end).toBe("2014-03-01");
                    done();
                };

                controller.trigger("change:applySelectedDateRange", cb);
            });
            it("should emit changed:appliedDateRange event", function(done) {
                controller.on("changed:appliedDateRange", done);
                controller.trigger("change:applySelectedDateRange");
            });
        })

        describe("on change:dateRangeLast event", function() {
            describe("when called with last week param", function() {

                var timeParam;
                beforeEach(function(){
                    timeParam = "week";
                });
                it("should update model selected start and end dates using datepicker method", function(done) {
                    var cb = function() {
                        expect(controller.model.get("selected")).toBe("generatePreviosResponse");
                        expect(datepicker.$args.generatePrevious[0]).toBe("2014-06-10");
                        expect(datepicker.$args.generatePrevious[1]).toBe(7);
                        expect(datepicker.$args.generatePrevious[2]).toBe("day");
                        done();
                    };

                    controller.trigger("change:dateRangeLast", timeParam, cb);
                });
                it("should emit changed:selectedDateRange event", function(done) {
                    controller.on("changed:selectedDateRange", done)
                    controller.trigger("change:dateRangeLast", timeParam);
                });
            });
            describe("when called with last day param", function() {
                var timeParam;
                beforeEach(function(){
                    timeParam = "day";
                });
                it("should update model selected start and end dates using datepicker method", function(done) {
                    var cb = function() {
                        expect(controller.model.get("selected")).toBe("generatePreviousResponse");
                        expect(datepicker.$args.generatePrevious[0]).toBe("2014-06-10");
                        expect(datepicker.$args.generatePrevious[1]).toBe(1);
                        expect(datepicker.$args.generatePrevious[2]).toBe("day");
                        done();
                    };

                    controller.trigger("change:dateRangeLast", timeParam, cb);
                });
                it("should emit changed:selectedDateRange event", function(done) {
                    controller.on("changed:selectedDateRange", done)
                    controller.trigger("change:dateRangeLast", timeParam);
                });
            });
            describe("when called with last month param", function() {
                var timeParam;
                beforeEach(function(){
                    timeParam = "day";
                });
                it("should update model selected start and end dates using datepicker method", function(done) {
                    var cb = function() {
                        expect(controller.model.get("selected")).toBe("generatePreviousResponse");
                        expect(datepicker.$args.generatePrevious[0]).toBe("2014-06-10");
                        expect(datepicker.$args.generatePrevious[1]).toBe(1);
                        expect(datepicker.$args.generatePrevious[2]).toBe("month");
                        done();
                    };

                    controller.trigger("change:dateRangeLast", timeParam, cb);
                });
                it("should emit changed:selectedDateRange event", function(done) {
                    controller.on("changed:selectedDateRange", done)
                    controller.trigger("change:dateRangeLast", timeParam);
                });
            });
            describe("when called with last quarter param", function() {
                var timeParam;
                beforeEach(function(){
                    timeParam = "quarter";
                });
                it("should update model selected start and end dates using datepicker method", function(done) {
                    var cb = function() {
                        expect(controller.model.get("selected")).toBe("generatePreviousResponse");
                        expect(datepicker.$args.generatePrevious[0]).toBe("2014-06-10");
                        expect(datepicker.$args.generatePrevious[1]).toBe(1);
                        expect(datepicker.$args.generatePrevious[2]).toBe("quarter");
                        done();
                    };

                    controller.trigger("change:dateRangeLast", timeParam, cb);
                });
                it("should emit changed:selectedDateRange event", function(done) {
                    controller.on("changed:selectedDateRange", done)
                    controller.trigger("change:dateRangeLast", timeParam);
                });
            });
        })
    })
})
