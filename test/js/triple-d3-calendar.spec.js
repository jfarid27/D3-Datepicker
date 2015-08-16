define(function(require, exports, module) {

    var _ = require("underscore"),
        moment = require("moment"),
        d3 = require("d3"),
        calendar = require("src/js/d3-calendar"),
        TripCal = require("src/js/triple-d3-calendar");

    describe("D3 triple calendar integration tests", function() {

        var tripCal
        beforeEach(function() {
            tripCal = TripCal(_, d3, moment, calendar);
        });

        describe("optionsTransformer method", function() {

            var mockOptions;
            beforeEach(function() {
                mockOptions = {
                    y: {
                        min: 0,
                        max: 300
                    },
                    x: {
                        min: 0,
                        max: 900
                    }
                };
            })

            describe("when given type left", function() {

                var type, expected;
                beforeEach(function() {
                    type = "left";
                    expected = {
                        y: {
                            min: 0,
                            max: 300
                        },
                        x: {
                            min: 0,
                            max: 300
                        }
                    };
                });
                it("should split given options with proper start and end parameters", function() {
                    var response = tripCal.optionsTransformer(type, mockOptions);
                    expect(response.x.max).toBe(expected.x.max);
                    expect(response.x.min).toBe(expected.x.min);
                    expect(response.y.max).toBe(expected.y.max);
                    expect(response.y.min).toBe(expected.y.min);
                });
            });
            describe("when given type center", function() {

                var type, expected;
                beforeEach(function() {
                    type = "center";
                    expected = {
                        y: {
                            min: 0,
                            max: 300
                        },
                        x: {
                            min: 300,
                            max: 600
                        }
                    };
                });
                it("should split given options with proper start and end parameters", function() {
                    var response = tripCal.optionsTransformer(type, mockOptions);
                    expect(response.x.max).toBe(expected.x.max);
                    expect(response.x.min).toBe(expected.x.min);
                    expect(response.y.max).toBe(expected.y.max);
                    expect(response.y.min).toBe(expected.y.min);
                });
            });
            describe("when given type right", function() {

                var type, expected;
                beforeEach(function() {
                    type = "right";
                    expected = {
                        y: {
                            min: 0,
                            max: 300
                        },
                        x: {
                            min: 600,
                            max: 900
                        }
                    };
                });
                it("should split given options with proper start and end parameters", function() {
                    var response = tripCal.optionsTransformer(type, mockOptions);
                    expect(response.x.max).toBe(expected.x.max);
                    expect(response.x.min).toBe(expected.x.min);
                    expect(response.y.max).toBe(expected.y.max);
                    expect(response.y.min).toBe(expected.y.min);
                });
            });
        });
    });

});
