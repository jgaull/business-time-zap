'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('business-time', () => {
  zapier.tools.env.inject();

  it('should add some time to a date', (done) => {
    const bundle = {
      authData: {
        username: '',
        password: ''
      },
      inputData: {
        date: '08/18/2018',
        format: 'MM/DD/YYYY',
        amount: 2,
        units: 'days',
        operation: 'add'
      }
    };

    appTester(App.creates.addSubtractWorkingTime.operation.perform, bundle)
      .then((response) => {
        should.exist(response);
        should.equal(response.date, '08/21/2018');
        done();
      })
      .catch(done);
  });

  it('should subtract some time from a date', (done) => {
    const bundle = {
      authData: {
        username: '',
        password: ''
      },
      inputData: {
        date: '08/20/2018',
        format: 'MM/DD/YYYY',
        amount: 2,
        units: 'days',
        operation: 'subtract'
      }
    };

    appTester(App.creates.addSubtractWorkingTime.operation.perform, bundle)
      .then((response) => {
        should.exist(response);
        should.equal(response.date, '08/16/2018');
        done();
      })
      .catch(done);
  });

  it('should return the next working day', (done) => {
    const bundle = {
      authData: {
        username: '',
        password: ''
      },
      inputData: {
        date: '08/20/2018 03:30',
        format: 'MM/DD/YYYY HH:mm',
        operation: 'next',
        type: 'date'
      }
    };

    appTester(App.creates.nextLastWorkingDayTime.operation.perform, bundle)
      .then((response) => {
        should.exist(response);
        should.equal(response.date, '08/21/2018 03:30');
        done();
      })
      .catch(done);
  });

  it('should return the start of the next working day', (done) => {
    const bundle = {
      authData: {
        username: '',
        password: ''
      },
      inputData: {
        date: '08/18/2018 13:00',
        format: 'MM/DD/YYYY HH:mm',
        operation: 'next',
        type: 'time'
      }
    };

    appTester(App.creates.nextLastWorkingDayTime.operation.perform, bundle)
      .then((response) => {
        should.exist(response);
        should.equal(response.date, '08/20/2018 09:00');
        done();
      })
      .catch(done);
  });

  it('should return the previous working day', (done) => {
    const bundle = {
      authData: {
        username: '',
        password: ''
      },
      inputData: {
        date: '08/20/2018 03:30',
        format: 'MM/DD/YYYY HH:mm',
        operation: 'previous',
        type: 'date'
      }
    };

    appTester(App.creates.nextLastWorkingDayTime.operation.perform, bundle)
      .then((response) => {
        should.exist(response);
        should.equal(response.date, '08/17/2018 03:30');
        done();
      })
      .catch(done);
  });

  it('should return the end of the previous working day', (done) => {
    const bundle = {
      authData: {
        username: '',
        password: ''
      },
      inputData: {
        date: '08/19/2018 13:00',
        format: 'MM/DD/YYYY HH:mm',
        operation: 'previous',
        type: 'time'
      }
    };

    appTester(App.creates.nextLastWorkingDayTime.operation.perform, bundle)
      .then((response) => {
        should.exist(response);
        should.equal(response.date, '08/17/2018 17:00');
        done();
      })
      .catch(done);
  });

  it('should determine whether or not a date is a business day', (done) => {
    const bundle = {
      authData: {
        username: '',
        password: ''
      },
      inputData: {
        monday: "9:00am-5:00pm",
        businessHoursFormat: "h:mma",
        date: "2018-08-19T18:27:24-07:00",
        amount: "1",
        values: [{
          units: "days",
          date: "2018-08-19T18:27:24-07:00",
          amount: 1
        }],
        businesshours: [{
          businessHoursFormat: "h:mma",
          monday: "2018-08-27T19:00:00-07:00"
        }],
        units: "days",
        operation: "add"
      }
    };

    appTester(App.creates.isWorkingDay.operation.perform, bundle)
      .then((response) => {
        should.exist(response);
        (response.isWorkingDay).should.be.true();
        done();
      })
      .catch(done);
  });

  it('supports holidays', (done) => {
    const bundle = {
      authData: {
        username: '',
        password: ''
      },
      inputData: {
        date: "2018-10-18T00:00:00-07:00",
        values: [{
          units: "days",
          date: "2018-08-19T18:27:24-07:00",
          amount: 1
        }],
        holidays: ['*-10-18'],
        units: "days",
        operation: "add"
      }
    };

    appTester(App.creates.isWorkingDay.operation.perform, bundle)
      .then((response) => {
        should.exist(response);
        (response.isWorkingDay).should.be.false();
        done();
      })
      .catch(done);
  });
});
