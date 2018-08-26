'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const REPO = 'username/reponame' // CHANGE THIS

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
      }
    };

    appTester(App.creates.addWorkingTime.operation.perform, bundle)
      .then((response) => {
        var expected = { "date": "08/21/2018", "params": { "date": "2018-08-18T00:00:00.000Z", "format": "MM/DD/YYYY", "amount": 2, "units": "days", "outputFormat": "MM/DD/YYYY" } };
        should.deepEqual(response, expected, 'Received unexpected data in the response');
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
      }
    };

    appTester(App.creates.subtractWorkingTime.operation.perform, bundle)
      .then((response) => {
        var expected = {"date":"08/16/2018","params":{"date":"2018-08-20T00:00:00.000Z","format":"MM/DD/YYYY","amount":2,"units":"days","outputFormat":"MM/DD/YYYY"}};
        should.deepEqual(response, expected, 'Received unexpected data in the response');
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
        date: '08/20/2018',
        format: 'MM/DD/YYYY',
        amount: 2,
        units: 'days',
      }
    };

    appTester(App.creates.nextWorkingDay.operation.perform, bundle)
      .then((response) => {
        var expected = { "date": "08/21/2018", "params": { "date": "2018-08-20T00:00:00.000Z", "format": "MM/DD/YYYY", "amount": 2, "units": "days", "outputFormat": "MM/DD/YYYY" } };
        should.deepEqual(response, expected, 'Received unexpected data in the response');
        done();
      })
      .catch(done);
  });
});
