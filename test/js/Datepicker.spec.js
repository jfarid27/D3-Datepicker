define(function(require, exports, module) {

    describe("Datepicker integration tests", function() {

        var instance, Datepicker, moment;
        beforeEach(function() {

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

            moment = require('moment');

            Datepicker = require("src/js/Datepicker");

            instance = Datepicker(moment);
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        });


        describe("monthGenerator method", function() {
            describe("when given ISOString", function() {

                var startDate, expected;
                beforeEach(function() {
                    startDate = "2015-04-01";
                    expected = {
                        "month": "Apr",
                        "year": "2015"
                    }
                });
                it("should return monthObject", function() {
                    var response = instance.monthGenerator(startDate);
                    expect(response.month).toBe(expected.month);
                    expect(response.year).toBe(expected.year);
                });
            });
        });

        describe("quarterGenerator method", function() {
            describe("when given ISOString", function() {
                var startDate, expected;
                beforeEach(function() {
                    startDate = "2015-04-01";
                    expected = {
                        "months": ["Apr", "May", "Jun"],
                        "year": "2015"
                    }
                });
                it("should return quarterObject", function() {
                    var response = instance.quarterGenerator(startDate);
                    expect(response.months[0]).toBe(expected.months[0]);
                    expect(response.months[1]).toBe(expected.months[1]);
                    expect(response.months[2]).toBe(expected.months[2]);
                    expect(response.year).toBe(expected.year);
                });
            })
        });

        describe("pickDates method", function() {
            describe("when selection is set to start date", function() {

                var pickType;
                beforeEach(function() {
                    pickType = "start";
                });

                describe("when given selected dates that are valid", function() {
                    var start, end;
                    beforeEach(function() {
                        start = "2014-02-23";
                        end = "2014-04-01";
                    });

                    it("should return object with matching start and end dates", function(done) {
                        var cb = function(response) {

                            expect(response.start).toBe("2014-02-23");
                            expect(response.end).toBe("2014-04-01");
                            done();
                        };

                        instance.pickDates(pickType, start, end, cb);
                    });
                });

                describe("when given selected dates where start date follows end date", function() {

                    var start, end;
                    beforeEach(function() {
                        start = "2014-02-23";
                        end = "2014-02-01";
                    });

                    it("should return start and end date on user defined start date", function(done) {
                        var cb = function(response) {

                            expect(response.start).toBe("2014-02-23");
                            expect(response.end).toBe("2014-02-23");
                            done();
                        };

                        instance.pickDates(pickType, start, end, cb);
                    });
                });
            });

            describe("when selection is set to end date", function() {

                var pickType;
                beforeEach(function() {
                    pickType = "end";
                });

                describe("when given selected dates that are valid", function() {
                    var start, end;
                    beforeEach(function() {
                        start = "2014-02-23";
                        end = "2014-04-01";
                    });

                    it("should return object with matching start and end dates", function(done) {
                        var cb = function(response) {

                            expect(response.start).toBe("2014-02-23");
                            expect(response.end).toBe("2014-04-01");
                            done();
                        };

                        instance.pickDates(pickType, start, end, cb);
                    });
                });

                describe("when given selected dates when end date preceedes start date", function() {
                    var start, end;
                    beforeEach(function() {
                        start = "2014-02-23";
                        end = "2014-01-01";
                    });

                    it("should return start and end date on user defined end date", function(done) {
                        var cb = function(response) {

                            expect(response.start).toBe("2014-01-01");
                            expect(response.end).toBe("2014-01-01");
                            done();
                        };

                        instance.pickDates(pickType, start, end, cb);
                    });
                });

            });
        });

        describe("current method", function() {
            describe("when type is set to week", function() {

                var type;
                beforeEach(function() {
                    type = "week";
                });

                describe("when given end date", function() {

                    var endDate;
                    beforeEach(function() {
                        endDate = "2015-08-14";
                    });

                    it("should return moment.startOf with correct end and start", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2015-08-09");
                            expect(response.end).toBe("2015-08-14");
                            done();
                        }
                        instance.current(type, endDate, cb);
                    });
                });
            });
            describe("when type is set to month", function() {

                var type;
                beforeEach(function() {
                    type = "month";
                });
                describe("when given end date", function() {

                    var endDate;
                    beforeEach(function() {
                        endDate = "2015-08-14";
                    });

                    it("should return moment.startOf with correct end and start", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2015-08-01");
                            expect(response.end).toBe("2015-08-14");
                            done();
                        }
                        instance.current(type, endDate, cb);
                    });
                });
            });
            describe("when type is set to quarter", function() {

                var type;
                beforeEach(function() {
                    type = "quarter";
                });
                describe("when given end date", function() {

                    var endDate;
                    beforeEach(function() {
                        endDate = "2015-03-01";
                    });
                    it("should return moment.startOf with correct end and start", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2015-01-01");
                            expect(response.end).toBe("2015-03-01");
                            done();
                        }
                        instance.current(type, endDate, cb);
                    });
                });
            });
        });

        describe("generatePrevious method", function() {

            describe("when type is set to 'quarter'", function() {

                var type;
                beforeEach(function() {
                    type = 'quarter';
                });

                describe("when given end date and number of quarters", function() {

                    var mockEndDate, mockNumberOfQuarters;
                    beforeEach(function() {
                        mockEndDate = "2014-04-01";
                        mockNumberOfQuarters = 1
                    });
                    it("should return moment.substract response with number of quarters", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2014-01-01");
                            expect(response.end).toBe("2014-04-01");
                            done();
                        };

                        instance.generatePrevious(mockEndDate, mockNumberOfQuarters, type, cb);
                    });
                });
            });

            describe("when type is set to 'month'", function() {
                var type;
                beforeEach(function() {
                    type = 'month';
                });

                describe("when given end date and number of months", function() {
                    var mockEndDate, mockNumberOfMonths
                    beforeEach(function() {
                        mockEndDate = "2014-03-01";
                        mockNumberOfMonths = 1
                    });
                    it("should return moment.substract response with number of months", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2014-02-01");
                            expect(response.end).toBe("2014-03-01");
                            done();
                        };

                        instance.generatePrevious(mockEndDate, mockNumberOfMonths, type, cb);
                    });
                });
            });

            describe("when type is set to 'day'", function() {
                var type;
                beforeEach(function() {
                    type = "day";
                });

                describe("when given end date and number of days", function() {
                    var mockEndDate, mockNumberOfDays;
                    beforeEach(function() {
                        mockEndDate = "2014-03-20";
                        mockNumberOfDays = 10;
                    });
                    it("should return response with correct start and end dates", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2014-03-10");
                            expect(response.end).toBe("2014-03-20");
                            done();
                        };

                        instance.generatePrevious(mockEndDate, mockNumberOfDays, type, cb);
                    });
                });
            });
        });


    });

});
