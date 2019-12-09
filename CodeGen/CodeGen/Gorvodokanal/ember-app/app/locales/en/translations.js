import Ember from 'ember';
import EmberFlexberryTranslations from 'ember-flexberry/locales/en/translations';

import IISGorvodokanalAddressLForm from './forms/i-i-s-gorvodokanal-address-l';
import IISGorvodokanalRequestLForm from './forms/i-i-s-gorvodokanal-request-l';
import IISGorvodokanalTaskLForm from './forms/i-i-s-gorvodokanal-task-l';
import IISGorvodokanalTeamLForm from './forms/i-i-s-gorvodokanal-team-l';
import IISGorvodokanalAddressEForm from './forms/i-i-s-gorvodokanal-address-e';
import IISGorvodokanalRequestEForm from './forms/i-i-s-gorvodokanal-request-e';
import IISGorvodokanalTaskEForm from './forms/i-i-s-gorvodokanal-task-e';
import IISGorvodokanalTeamEForm from './forms/i-i-s-gorvodokanal-team-e';
import IISGorvodokanalAddressModel from './models/i-i-s-gorvodokanal-address';
import IISGorvodokanalRequestModel from './models/i-i-s-gorvodokanal-request';
import IISGorvodokanalTaskListModel from './models/i-i-s-gorvodokanal-task-list';
import IISGorvodokanalTaskModel from './models/i-i-s-gorvodokanal-task';
import IISGorvodokanalTeamModel from './models/i-i-s-gorvodokanal-team';

const translations = {};
Ember.$.extend(true, translations, EmberFlexberryTranslations);

Ember.$.extend(true, translations, {
  models: {
    'i-i-s-gorvodokanal-address': IISGorvodokanalAddressModel,
    'i-i-s-gorvodokanal-request': IISGorvodokanalRequestModel,
    'i-i-s-gorvodokanal-task-list': IISGorvodokanalTaskListModel,
    'i-i-s-gorvodokanal-task': IISGorvodokanalTaskModel,
    'i-i-s-gorvodokanal-team': IISGorvodokanalTeamModel,
  },

  'application-name': 'Application caption',

  forms: {
    loading: {
      'spinner-caption': 'Loading stuff, please have a cold beer...'
    },
    index: {
      greeting: 'Welcome to ember-flexberry test stand!'
    },

    application: {
      header: {
        menu: {
          'sitemap-button': {
            caption: '',
            title: 'Menu'
          },
          'user-settings-service-checkbox': {
            caption: 'Use service to save user settings'
          },
          'show-menu': {
            caption: 'Show menu'
          },
          'hide-menu': {
            caption: 'Hide menu'
          },
          'language-dropdown': {
            caption: 'Application language',
            placeholder: 'Choose language'
          }
        },
        login: {
          caption: 'Login'
        },
        logout: {
          caption: 'Logout'
        }
      },

      footer: {
        'application-name': 'Application caption',
        'application-version': {
          caption: 'Addon version {{version}}',
          title: 'It is version of ember-flexberry addon, which uses in this dummy application ' +
          '(npm version + commit sha). ' +
          'Click to open commit on GitHub.'
        }
      },

      sitemap: {
        'application-name': {
          caption: 'Application caption',
          title: 'Application title'
        },
        'application-version': {
          caption: 'Addon version {{version}}',
          title: 'It is version of ember-flexberry addon, which uses in this dummy application ' +
          '(npm version + commit sha). ' +
          'Click to open commit on GitHub.'
        },
        index: {
          caption: 'Home',
          title: ''
        },
        заявки: {
          caption: 'заявки',
          title: 'заявки',
          'i-i-s-gorvodokanal-request-l': {
            caption: 'i-i-s-gorvodokanal-request-l',
            title: 'i-i-s-gorvodokanal-request-l'
          }
        },
        списки: {
          caption: 'списки',
          title: 'списки',
          'i-i-s-gorvodokanal-address-l': {
            caption: 'i-i-s-gorvodokanal-address-l',
            title: 'i-i-s-gorvodokanal-address-l'
          },
          'i-i-s-gorvodokanal-task-l': {
            caption: 'i-i-s-gorvodokanal-task-l',
            title: 'i-i-s-gorvodokanal-task-l'
          },
          'i-i-s-gorvodokanal-team-l': {
            caption: 'i-i-s-gorvodokanal-team-l',
            title: 'i-i-s-gorvodokanal-team-l'
          }
        },
      }
    },

    'edit-form': {
      'save-success-message-caption': 'Save operation succeed',
      'save-success-message': 'Object saved',
      'save-error-message-caption': 'Save operation failed',
      'delete-success-message-caption': 'Delete operation succeed',
      'delete-success-message': 'Object deleted',
      'delete-error-message-caption': 'Delete operation failed'
    },
    'i-i-s-gorvodokanal-address-l': IISGorvodokanalAddressLForm,
    'i-i-s-gorvodokanal-request-l': IISGorvodokanalRequestLForm,
    'i-i-s-gorvodokanal-task-l': IISGorvodokanalTaskLForm,
    'i-i-s-gorvodokanal-team-l': IISGorvodokanalTeamLForm,
    'i-i-s-gorvodokanal-address-e': IISGorvodokanalAddressEForm,
    'i-i-s-gorvodokanal-request-e': IISGorvodokanalRequestEForm,
    'i-i-s-gorvodokanal-task-e': IISGorvodokanalTaskEForm,
    'i-i-s-gorvodokanal-team-e': IISGorvodokanalTeamEForm,
  },

});

export default translations;
