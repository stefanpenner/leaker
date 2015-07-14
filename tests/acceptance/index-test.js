import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'container-leak/tests/helpers/start-app';

var application;

module('Acceptance | index', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

function runInSeries() {
  test('visiting /index', function(assert) {
    visit('/');

    andThen(function() {
      assert.equal(currentURL(), '/');
    });
  });
}
var i = 0;
while(i < 100) {
  runInSeries();
  i++;
}
