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
  this.route('i-i-s-gorvodokanal-category-l');
  this.route('i-i-s-gorvodokanal-category-e',
  { path: 'i-i-s-gorvodokanal-category-e/:id' });
  this.route('i-i-s-gorvodokanal-category-e.new',
  { path: 'i-i-s-gorvodokanal-category-e/new' });
  this.route('i-i-s-gorvodokanal-request-l');
  this.route('i-i-s-gorvodokanal-request-e',
  { path: 'i-i-s-gorvodokanal-request-e/:id' });
  this.route('i-i-s-gorvodokanal-request-e.new',
  { path: 'i-i-s-gorvodokanal-request-e/new' });
  this.route('i-i-s-gorvodokanal-task-l');
  this.route('i-i-s-gorvodokanal-task-e',
  { path: 'i-i-s-gorvodokanal-task-e/:id' });
  this.route('i-i-s-gorvodokanal-task-e.new',
  { path: 'i-i-s-gorvodokanal-task-e/new' });
  this.route('i-i-s-gorvodokanal-team-l');
  this.route('i-i-s-gorvodokanal-team-e',
  { path: 'i-i-s-gorvodokanal-team-e/:id' });
  this.route('i-i-s-gorvodokanal-team-e.new',
  { path: 'i-i-s-gorvodokanal-team-e/new' });
  this.route('temp');
});

export default Router;
