import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.irregular('address', 'Addresss');
inflector.irregular('request', 'Requests');
inflector.irregular('task', 'Tasks');
inflector.irregular('team', 'Teams');

export default {};
