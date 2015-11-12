import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'container-leak/tests/helpers/start-app';
import {STRESS_TIMES} from 'container-leak/tests/helpers/utils';

module('Acceptance | comments', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

function runInSeries() {
  test('visiting /comments', function(assert) {
    visit('/');
    click(".main-nav > a:eq(2)");

    andThen(function() {
      assert.equal(currentURL(), '/comments');
    });
    click(".main-nav > a:eq(1)");
    click(".main-nav > a:eq(0)");
  });
}
var i = 0;
while(i < STRESS_TIMES) {
  runInSeries();
  i++;
}
