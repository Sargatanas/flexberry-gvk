import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.irregular('address', 'Addresses');
inflector.irregular('request', 'Requests');
inflector.irregular('task', 'Tasks');
inflector.irregular('team', 'Teams');

export default {};
