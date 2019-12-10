import Ember from 'ember';
import ReqestModel from '../models/i-i-s-gorvodokanal-request';

export default Ember.Route.extend({
  model(id) {
    return Ember.RSVP.hash({
      requests: ReqestModel,
      tasks: this.store.findAll('i-i-s-gorvodokanal-task'),
      teams: this.store.findAll('i-i-s-gorvodokanal-team'),
    })
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'requests', model.requests);
    Ember.set(controller, 'tasks', model.tasks);
    Ember.set(controller, 'teams', model.teams);
  },
});
