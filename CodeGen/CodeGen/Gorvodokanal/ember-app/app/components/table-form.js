import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
      reloadTable() {
        this.sendAction('reloadTable');
      }
    },
});
