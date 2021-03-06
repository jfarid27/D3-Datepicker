define(function(require, exports, module) {

    describe("Datepicker", function() {

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

        describe("generateCalendarDates method", function() {
            describe("when given date", function() {

                var endDate;
                beforeEach(function(){
                    endDate = "2014-08-14";
                });

                describe("and type is set to months", function() {
                    var type, steps;
                    beforeEach(function(){
                        type = "month";
                        steps = 3;
                    });
                    it("should generate ISOStrings for months included in range", function(done) {
                        var cb = function(response) {
                            expect(response[0]).toBe("2014-06-01");
                            expect(response[1]).toBe("2014-07-01");
                            expect(response[2]).toBe("2014-08-01");
                            done();
                        };

                        instance.generateCalendarDates(endDate, steps, type, cb);
                    });
                });
                describe("and type is set to quarter", function() {
                    var type, steps;
                    beforeEach(function(){
                        type = "quarter";
                        steps = 3;
                    });
                    it("should generate ISOStrings for quarters included in range", function(done) {
                        var cb = function(response) {
                            expect(response[0]).toBe("2014-01-01");
                            expect(response[1]).toBe("2014-04-01");
                            expect(response[2]).toBe("2014-07-01");
                            done();
                        };

                        instance.generateCalendarDates(endDate, steps, type, cb);
                    });
                });
            });
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
