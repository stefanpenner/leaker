import { moduleFor, test } from 'ember-qunit';

moduleFor('route:comments', 'Unit | Route | comments', {
  // Specify the other units that are required for this test.
  needs: ['router:main']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
