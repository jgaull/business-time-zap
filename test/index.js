'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const REPO = 'username/reponame' // CHANGE THIS

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('issue trigger', () => {
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
        //console.log('response: ' + JSON.stringify(response));
        done();
      })
      .catch(done);
  });
});
