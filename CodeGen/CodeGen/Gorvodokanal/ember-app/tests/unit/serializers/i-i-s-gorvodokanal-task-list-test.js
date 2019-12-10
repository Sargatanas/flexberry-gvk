import { moduleForModel, test } from 'ember-qunit';

moduleForModel('i-i-s-gorvodokanal-task-list', 'Unit | Serializer | i-i-s-gorvodokanal-task-list', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:i-i-s-gorvodokanal-task-list',
    'transform:file',
    'transform:decimal',
    'transform:guid',

    'transform:i-i-s-gorvodokanal-t-appointed',
    'transform:i-i-s-gorvodokanal-t-districts',
    'transform:i-i-s-gorvodokanal-t-importance',

    'model:i-i-s-gorvodokanal-address',
    'model:i-i-s-gorvodokanal-category-list',
    'model:i-i-s-gorvodokanal-category',
    'model:i-i-s-gorvodokanal-request',
    'model:i-i-s-gorvodokanal-task-list',
    'model:i-i-s-gorvodokanal-task',
    'model:i-i-s-gorvodokanal-team'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
