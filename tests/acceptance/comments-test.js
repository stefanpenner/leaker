import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'container-leak/tests/helpers/start-app';

module('Acceptance | comments', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /comments', function(assert) {
  visit('/');
  assert.ok(true);
});
