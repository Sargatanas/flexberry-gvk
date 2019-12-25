import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'tr',
    classNames: ['element-body__row'],

    actions: {
      reloadTable() {
        this.sendAction('reloadTable');
      }
    },
});
