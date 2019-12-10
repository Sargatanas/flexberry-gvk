import { getTaskById } from 'ember-app/helpers/get-task-by-id';
import { module, test } from 'qunit';

module('Unit | Helper | get task by id');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = getTaskById([42]);
  assert.ok(result);
});
