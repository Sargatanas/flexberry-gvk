import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
      reloadTable() {
        console.log('456');
        this.sendAction('reloadTable');
      }
    },
});
