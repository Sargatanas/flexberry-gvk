import { moduleForModel, test } from 'ember-qunit';

moduleForModel('i-i-s-gorvodokanal-team', 'Unit | Serializer | i-i-s-gorvodokanal-team', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:i-i-s-gorvodokanal-team',
    'transform:file',
    'transform:decimal',
    'transform:guid',

    'transform:i-i-s-gorvodokanal-t-appointed',

    'model:i-i-s-gorvodokanal-address',
    'model:i-i-s-gorvodokanal-request',
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
