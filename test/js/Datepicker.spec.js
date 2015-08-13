define(function(require, exports, module) {

    describe("Datepicker scenarios", function() {

        var instance, Datepicker, moment;
        beforeEach(function(){

            moment = require('moment');

            Datepicker = require("src/js/Datepicker");

            instance = Datepicker(moment);
        })

        describe("pickDatesDay method", function() {
            describe("when selection is set to start date", function() {

                var pickType;
                beforeEach(function(){
                    pickType = "start"
                })

                describe("when given selected dates that are valid", function() {
                    it("should return object with matching start and end dates");
                });

                describe("when given selected dates when end date preceedes start date", function() {
                    it("should return start and end date on user defined start date");
                });
            });

            describe("when selection is set to end date", function() {
                describe("when given selected dates that are valid", function() {
                    it("should return object with matching start and end dates");
                });

                describe("when given selected dates when end date preceedes start date", function() {
                    it("should return start and end date on user defined end date");
                });

            });
        });

        describe("pickDatesMonth method", function() {
            describe("when selection is set to start date", function() {
                describe("when given selected dates that are valid", function() {
                    it("should return object with matching start and end dates");
                });

                describe("when given selected dates when end date preceedes start date", function() {
                    it("should return start and end date on user defined start date");
                });
            });

            describe("when selection is set to end date", function() {
                describe("when given selected dates that are valid", function() {
                    it("should return object with matching start and end dates");
                });

                describe("when given selected dates when end date preceedes start date", function() {
                    it("should return start and end date on user defined end date");
                });
            });
        });

        describe("pickDatesQuarter method", function() {

            describe("when selection is set to start date", function() {
                describe("when given selected dates that are valid", function() {
                    it("should return object with matching start and end dates");
                });

                describe("when given selected dates when end date preceedes start date", function() {
                    it("should return start and end date on user defined start date");
                });
            });

            describe("when selection is set to end date", function() {
                describe("when given selected dates that are valid", function() {
                    it("should return object with matching start and end dates");
                });

                describe("when given selected dates when end date preceedes start date", function() {
                    it("should return start and end date on user defined end date");
                });
            });
        });

        describe("pickDates method", function() {
            describe("when time unit is set to day", function() {
                it("should delegate response to pickDatesDay method");
            });

            describe("when time unit is set to month", function() {
                it("should delegate response to pickDatesDay method");
            });

            describe("when time unit is set to quarter", function() {
                it("should delegate response to pickDatesQuarter method");
            });
        });


        describe("generatePrevious method", function() {

            describe("when type is set to 'quarter'", function() {

                var type;
                beforeEach(function() {
                    type = 'quarter';
                });

                describe("when given end date and number of quarters", function() {

                    var mockEndDate, mockNumberOfQuarters
                    beforeEach(function() {
                        mockEndDate = "2014-04-01";
                        mockNumberOfQuarters = 1
                    })
                    it("should return moment.substract response with number of quarters", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2014-01-01");
                            expect(response.end).toBe("2014-04-01");
                            done();
                        };

                        instance.generatePrevious(mockEndDate, mockNumberOfQuarters, type, cb);
                    })
                })
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
                    })
                    it("should return moment.substract response with number of months", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2014-02-01");
                            expect(response.end).toBe("2014-03-01");
                            done();
                        };

                        instance.generatePrevious(mockEndDate, mockNumberOfMonths, type, cb);
                    })
                })
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
                    })
                    it("should return response with correct start and end dates", function(done) {
                        var cb = function(response) {
                            expect(response.start).toBe("2014-03-10");
                            expect(response.end).toBe("2014-03-20");
                            done();
                        };

                        instance.generatePrevious(mockEndDate, mockNumberOfDays, type, cb);
                    })
                })
            });
        });


    });

});
