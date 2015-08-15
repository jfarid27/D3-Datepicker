define(function(require, exports, module) {

    var _ = require("underscore"),
        moment = require("moment"),
        d3 = require("d3");

    describe("D3 calendar integration tests", function() {

        var d3Calendar, D3Calendar
        beforeEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;
            D3Calendar = require("src/js/d3-calendar");
            d3Calendar = D3Calendar(_, d3, moment);

        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        });

        describe("groupByDay method", function() {
            describe("when given list of date objects", function() {

                var aug2015;
                beforeEach(function() {
                    d3Calendar.generateMonthsDays("2015-08-01", function(res) {
                        aug2015 = res;
                    });
                });

                it("should return a hash array of date objects on matching days", function(done) {
                    var cb = function(res) {
                        expect(res["Monday"].length).toBe(5);
                        expect(res["Sunday"].length).toBe(5);
                        expect(res["Saturday"].length).toBe(5);
                        done();
                    };

                    d3Calendar.groupByDay(aug2015, cb);
                });
            });
        });

        describe("generateMonthsDays method", function() {
            describe("when given first date of the month", function() {

                var firstDate;
                beforeEach(function() {
                    firstDate = "2015-01-01";
                });

                it("should return a list of Date objects with ISOString info", function(done) {
                    var cb = function(response) {
                        expect(response.length).toBe(31);

                        var fifteenth = response.reduce(function(acc, next) {
                            var day;
                            if (next.date == "2015-01-23") {
                                day = next;
                            }
                            return acc ? acc : day;
                        }, undefined);

                        expect(fifteenth).not.toBeUndefined();
                        done();
                    };

                    d3Calendar.generateMonthsDays(firstDate, cb);
                });
            });
        });
    });

});
