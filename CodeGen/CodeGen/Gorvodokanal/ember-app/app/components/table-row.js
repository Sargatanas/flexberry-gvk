import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'tr',
    classNames: ['element-body__row'],

    actions: {
      reloadTable() {
        console.log('123');
        this.sendAction('reloadTable');
      }
    },
});
