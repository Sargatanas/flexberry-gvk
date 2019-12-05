import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('i-i-s-gorvodokanal-address-l');
  this.route('i-i-s-gorvodokanal-address-e',
  { path: 'i-i-s-gorvodokanal-address-e/:id' });
  this.route('i-i-s-gorvodokanal-address-e.new',
  { path: 'i-i-s-gorvodokanal-address-e/new' });
  this.route('i-i-s-gorvodokanal-request-l');
  this.route('i-i-s-gorvodokanal-request-e',
  { path: 'i-i-s-gorvodokanal-request-e/:id' });
  this.route('i-i-s-gorvodokanal-request-e.new',
  { path: 'i-i-s-gorvodokanal-request-e/new' });
  this.route('i-i-s-gorvodokanal-team-l');
  this.route('i-i-s-gorvodokanal-team-e',
  { path: 'i-i-s-gorvodokanal-team-e/:id' });
  this.route('i-i-s-gorvodokanal-team-e.new',
  { path: 'i-i-s-gorvodokanal-team-e/new' });
});

export default Router;
