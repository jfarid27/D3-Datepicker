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

        describe("computeRowColumnFromIndex", function() {
            describe("when given index", function() {

                var inputs, expected, result
                beforeEach(function() {
                    inputs = [7, 24, 32, 12];
                    expected = [{row:1,col:7}, {row:4, col:3}, {row:5, col:4}, {row:2,col:5}];
                    result = inputs.map(function(index){
                        return d3Calendar.computeRowColumnFromIndex(index);
                    });
                });

                it("should return proper row", function() {
                    expect(result[0].row).toBe(expected[0].row);
                    expect(result[1].row).toBe(expected[1].row);
                    expect(result[2].row).toBe(expected[2].row);
                    expect(result[3].row).toBe(expected[3].row);
                });

                it("should return proper column", function() {
                    expect(result[0].col).toBe(expected[0].col);
                    expect(result[1].col).toBe(expected[1].col);
                    expect(result[2].col).toBe(expected[2].col);
                    expect(result[3].col).toBe(expected[3].col);
                });
            });
        });

        describe("computeIndexes method", function() {
            describe("when given first day and list of date objects", function() {

                var firstDay, monthDays;
                beforeEach(function() {
                    firstDay = "2015-08-01";
                    d3Calendar.generateMonthsDays(firstDay, function(res) {
                        monthDays = res
                    })
                })

                it("should return date objects with proper formated calendar index", function(done) {
                    var cb = function(response) {
                        var firstDay = response.filter(function(dateObj) {
                            return (dateObj.date === "2015-08-01");
                        })[0];

                        var idesDay = response.filter(function(dateObj) {
                            return (dateObj.date === "2015-08-15");
                        })[0];

                        var twentyNinth = response.filter(function(dateObj) {
                            return (dateObj.date === "2015-08-29");
                        })[0];

                        expect(firstDay.index).toBe(7);
                        expect(idesDay.index).toBe(21);
                        expect(twentyNinth.index).toBe(35);
                        done();

                    };

                    d3Calendar.computeIndexes(firstDay, monthDays, cb);
                });
            });
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
