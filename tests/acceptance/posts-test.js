import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'container-leak/tests/helpers/start-app';
import {STRESS_TIMES} from 'container-leak/tests/helpers/utils';

module('Acceptance | posts', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

function runInSeries() {
  test('visiting /posts', function(assert) {
    visit('/');
    click(".main-nav > a:eq(1)");

    andThen(function() {
      assert.equal(currentURL(), '/posts');
    });
    click(".link-drafts");
    click(".main-nav > a:eq(2)");
    click(".main-nav > a:eq(0)");
  });
}
var i = 0;
while(i < STRESS_TIMES) {
  runInSeries();
  i++;
}
