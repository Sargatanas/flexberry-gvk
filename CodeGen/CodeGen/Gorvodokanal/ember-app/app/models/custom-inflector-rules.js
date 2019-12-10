import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.irregular('category', 'Categorys');
inflector.irregular('address', 'Addresss');
inflector.irregular('request', 'Requests');
inflector.irregular('list', 'Lists');
inflector.irregular('task', 'Tasks');
inflector.irregular('team', 'Teams');

export default {};
