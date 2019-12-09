import { moduleForModel, test } from 'ember-qunit';

moduleForModel('i-i-s-gorvodokanal-team', 'Unit | Model | i-i-s-gorvodokanal-team', {
  // Specify the other units that are required for this test.
  needs: [
    'model:i-i-s-gorvodokanal-address',
    'model:i-i-s-gorvodokanal-request',
    'model:i-i-s-gorvodokanal-task-list',
    'model:i-i-s-gorvodokanal-task',
    'model:i-i-s-gorvodokanal-team'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();

  // let store = this.store();
  assert.ok(!!model);
});
