import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'container-leak/tests/helpers/start-app';
import {STRESS_TIMES} from 'container-leak/tests/helpers/utils';

var application;

module('Acceptance | index', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

function runInSeries(i) {
  test('visiting /index' + i, function(assert) {
    visit('/');

    andThen(function() {
      assert.equal(currentURL(), '/');
    });
    click(".main-nav > a:eq(1)");
    click(".main-nav > a:eq(2)");
  });
}
var i = 0;
while(i < STRESS_TIMES) {
  runInSeries(i);
  i++;
}
