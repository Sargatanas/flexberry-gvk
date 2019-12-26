import Ember from 'ember';
import EmberFlexberryTranslations from 'ember-flexberry/locales/ru/translations';

import IISGorvodokanalAddressLForm from './forms/i-i-s-gorvodokanal-address-l';
import IISGorvodokanalCategoryLForm from './forms/i-i-s-gorvodokanal-category-l';
import IISGorvodokanalRequestLForm from './forms/i-i-s-gorvodokanal-request-l';
import IISGorvodokanalTaskLForm from './forms/i-i-s-gorvodokanal-task-l';
import IISGorvodokanalTeamLForm from './forms/i-i-s-gorvodokanal-team-l';
import IISGorvodokanalAddressEForm from './forms/i-i-s-gorvodokanal-address-e';
import IISGorvodokanalCategoryEForm from './forms/i-i-s-gorvodokanal-category-e';
import IISGorvodokanalRequestEForm from './forms/i-i-s-gorvodokanal-request-e';
import IISGorvodokanalTaskEForm from './forms/i-i-s-gorvodokanal-task-e';
import IISGorvodokanalTeamEForm from './forms/i-i-s-gorvodokanal-team-e';
import IISGorvodokanalAddressModel from './models/i-i-s-gorvodokanal-address';
import IISGorvodokanalCategoryListModel from './models/i-i-s-gorvodokanal-category-list';
import IISGorvodokanalCategoryModel from './models/i-i-s-gorvodokanal-category';
import IISGorvodokanalRequestModel from './models/i-i-s-gorvodokanal-request';
import IISGorvodokanalTaskListModel from './models/i-i-s-gorvodokanal-task-list';
import IISGorvodokanalTaskModel from './models/i-i-s-gorvodokanal-task';
import IISGorvodokanalTeamModel from './models/i-i-s-gorvodokanal-team';

const translations = {};
Ember.$.extend(true, translations, EmberFlexberryTranslations);

Ember.$.extend(true, translations, {
  models: {
    'i-i-s-gorvodokanal-address': IISGorvodokanalAddressModel,
    'i-i-s-gorvodokanal-category-list': IISGorvodokanalCategoryListModel,
    'i-i-s-gorvodokanal-category': IISGorvodokanalCategoryModel,
    'i-i-s-gorvodokanal-request': IISGorvodokanalRequestModel,
    'i-i-s-gorvodokanal-task-list': IISGorvodokanalTaskListModel,
    'i-i-s-gorvodokanal-task': IISGorvodokanalTaskModel,
    'i-i-s-gorvodokanal-team': IISGorvodokanalTeamModel,
  },

  'application-name': 'Горводоканал-Пермь',

  forms: {
    loading: {
      'spinner-caption': 'Данные загружаются, пожалуйста подождите...'
    },
    index: {
      greeting: 'Добро пожаловать на тестовый стенд ember-flexberry!'
    },

    application: {
      header: {
        menu: {
          'sitemap-button': {
            caption: '',
            title: 'Меню'
          },
          'user-settings-service-checkbox': {
            caption: 'Использовать сервис сохранения пользовательских настроек'
          },
          'show-menu': {
            caption: 'Показать меню'
          },
          'hide-menu': {
            caption: 'Скрыть меню'
          },
          'language-dropdown': {
            caption: 'Язык приложения',
            placeholder: 'Выберите язык'
          }
        },
        login: {
          caption: 'Вход'
        },
        logout: {
          caption: 'Выход'
        }
      },

      footer: {
        'application-name': 'Горводоканал-Пермь',
        'application-version': {
          caption: 'Версия аддона {{version}}',
          title: 'Это версия аддона ember-flexberry, которая сейчас используется в этом тестовом приложении ' +
          '(версия npm-пакета + хэш коммита). ' +
          'Кликните, чтобы перейти на GitHub.'
        }
      },

      sitemap: {
        'application-name': {
          caption: 'Горводоканал-Пермь',
          title: 'Горводоканал, отделение гор.Перми'
        },
        'application-version': {
          caption: 'Версия аддона {{version}}',
          title: 'Это версия аддона ember-flexberry, которая сейчас используется в этом тестовом приложении ' +
          '(версия npm-пакета + хэш коммита). ' +
          'Кликните, чтобы перейти на GitHub.'
        },
        index: {
          caption: 'Главная',
          title: ''
        },
        заявки: {
          caption: 'Заявки',
          title: 'Заявки',
          'i-i-s-gorvodokanal-request-l': {
            caption: 'Все',
            title: ''
          }
        },
        списки: {
          caption: 'Списки',
          title: 'Списки',
          'i-i-s-gorvodokanal-category-l': {
            caption: 'Категории',
            title: ''
          },
          'i-i-s-gorvodokanal-task-l': {
            caption: 'Задачи',
            title: ''
          },
          'i-i-s-gorvodokanal-address-l': {
            caption: 'Адреса',
            title: ''
          },
          'i-i-s-gorvodokanal-team-l': {
            caption: 'Бригады',
            title: ''
          }
        },
        timetable: {
          caption: 'Расписание',
          title: 'Расписание',
        },

      }
    },

    'edit-form': {
      'save-success-message-caption': 'Сохранение завершилось успешно',
      'save-success-message': 'Объект сохранен',
      'save-error-message-caption': 'Ошибка сохранения',
      'delete-success-message-caption': 'Удаление завершилось успешно',
      'delete-success-message': 'Объект удален',
      'delete-error-message-caption': 'Ошибка удаления'
    },
    'i-i-s-gorvodokanal-address-l': IISGorvodokanalAddressLForm,
    'i-i-s-gorvodokanal-category-l': IISGorvodokanalCategoryLForm,
    'i-i-s-gorvodokanal-request-l': IISGorvodokanalRequestLForm,
    'i-i-s-gorvodokanal-task-l': IISGorvodokanalTaskLForm,
    'i-i-s-gorvodokanal-team-l': IISGorvodokanalTeamLForm,
    'i-i-s-gorvodokanal-address-e': IISGorvodokanalAddressEForm,
    'i-i-s-gorvodokanal-category-e': IISGorvodokanalCategoryEForm,
    'i-i-s-gorvodokanal-request-e': IISGorvodokanalRequestEForm,
    'i-i-s-gorvodokanal-task-e': IISGorvodokanalTaskEForm,
    'i-i-s-gorvodokanal-team-e': IISGorvodokanalTeamEForm,
  },

});

export default translations;
