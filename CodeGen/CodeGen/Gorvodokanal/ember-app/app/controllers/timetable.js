import Ember from 'ember';

import dateForm from '../utils/date-form';
import dateShift from '../utils/date-shift';
import dateNullable from '../utils/date-nullable';
import dateString from '../utils/date-string';
import dateStringToForm from '../utils/data-string-to-form';
import requestCanBeDone from '../utils/request-can-be-done';
import getLastRequest from '../utils/get-last-request';

import { Query } from 'ember-flexberry-data';


export default Ember.Controller.extend({
  setupController: function(controller,model) {
    this._super(controller,model);
    var routeName = this.get('index');
    this.controllerFor('application').setActiveClass(routeName);
  },

  init() {
    this._super(...arguments);
  },

  week: [
      { id: 0, rus: 'пн', en: 'mon' },
      { id: 1, rus: 'вт', en: 'tue' },
      { id: 2, rus: 'ср', en: 'wed' },
      { id: 3, rus: 'чт', en: 'thu' },
      { id: 4, rus: 'пт', en: 'fri' },
      { id: 5, rus: 'сб', en: 'sat' },
      { id: 6, rus: 'вс', en: 'sun' }
  ],

  date: {
      id: new Date().getDay() - 1,
      value: new Date(),
  },

  teamList: [],
  teamShiftInfo: '',

  requestList: [],
  taskCount: '',

  freeRequestList: [],
  lastRequest: null,

  isTasksCreated: false,
  isShowTable: false,

  errors: {
      team: [],
      date: []
  },
  errorsStyle: 'custom-form-header-errors_none',
  currentDateString: '',
  isShowButtons: false,

  inputTeamId: '',
  inputDate: '',

  actions: {
      async validateInputs() {
          let teamIndex = Number(this.get('inputTeamId'));

          let date = this.get('inputDate');
          let reg = /\d\d[.]\d\d[.]\d\d\d\d$/;
          date = date.match(reg) ? dateStringToForm(date) : date;
          date = dateNullable(new Date(date));

          this.setProperties({
              isShowButtons: false,
              isTasksCreated: false,
              isShowTable: false,
              errors: {
                  team: [],
                  date: []
              },
              errorsStyle: '',
              currentDateString: ''
          });

          let teamErrors = [];
          let dateErrors = [];
          let errorElement = {
              name: '',
              error: '',
          };

          if ((String(date) === 'Invalid Date') || (!date) || (Number(date) < 0)) {
              errorElement.name = 'add-date';
              errorElement.content = 'Введите корректную дату';
              dateErrors.push(errorElement);
              errorElement = {
                  name: '',
                  error: ''
              };
          } else {
              date = new Date(date);
              this.setProperties({
                  currentDateString: `(${dateString(date)})`,
                  date: {
                      id: date.getDay() - 1,
                      value: date
                  }
              });
          }

          if (!teamIndex) {
              errorElement.name = 'add-team-id';
              errorElement.content = 'Введите номер бригады';
              teamErrors.push(errorElement);
              errorElement = {
                  name: '',
                  error: ''
              };
          } else if (isNaN(teamIndex) || (Number(teamIndex) < 1)) {
              errorElement.name = 'add-team-id';
              errorElement.content = 'Номер бригады должен выражаться положительным целым числом';
              teamErrors.push(errorElement);
              errorElement = {
                  name: '',
                  error: ''
              };
          }

          let teams = await this.selectRecords('i-i-s-gorvodokanal-team', 'TeamL', {index: teamIndex});

          if ((teams.length === 0) && (teamIndex) && (teamIndex > 0)) {
            errorElement.name = 'add-team-id';
            errorElement.content = 'Бригады с таким номером не существует';
            teamErrors.push(errorElement);
            errorElement = {
                name: '',
                error: ''
            };
          }

          this.setProperties({
            errors: {
              team: teamErrors,
              date: dateErrors
            }
          });

          if ((dateErrors.length === 0) && (teamErrors.length === 0)) {
            this.setProperties({
                isShowButtons: true
            });
            this.createTask();
          }
      },

      setDefaulData() {
        let date = '2019-11-26';
        let teamId = '103';

        this.setProperties({
            isShowButtons: true,
            inputTeamId: teamId,
            inputDate: date,
            errors: {
                team: [],
                date: []
            },
            errorsStyle: '',
            date: {
                id: new Date(date).getDay() - 1,
                value: dateNullable(new Date(date))
            }
        });
        this.createTask();
      },

      reloadTable() {
        this.setProperties({
          isShowButtons: false,
          isTasksCreated: false,
          isShowTable: false,
        });
        this.createTask();
      },
  },

  async selectRecords(name, projectionName, parameters, object) {
    let store = this.store;
    let selectedRecords = [];
    let builder = new Query.Builder(store, name);
    builder.count()
           .selectByProjection(projectionName);
    let allRecords = await store.query(name, builder.build());


    allRecords.forEach((record) => {
      let isRecordSuit = true;
      for (let key in parameters) {
        isRecordSuit = record.get(key) === parameters[key];
      }
      if (isRecordSuit) {
        selectedRecords.push(record);
      }
    });

    if (object) {
      this.set(object, selectedRecords);
    }

    return selectedRecords;
  },

  async createTask() {
      this.set('isShowTable', false);

      let teamIndex = Number(this.get('inputTeamId'));

      let date = dateNullable(this.get('date').value);
      date = dateNullable(date);
      let dates = [];

      for (let i = 0; i < 7; i++) {
          let currentDate = dateShift(i, date);
          let formDate = dateForm(currentDate);
          let content = {};
          content['date'] = formDate;
          content['count'] = 0;
          dates.push(content);
      }

      let currentTeam = [];
      let selectedRequests = [];
      let nonSelectedRequests = [];

      let store = this.store;
      let context = this;

      let parameters = {};

      currentTeam = await this.selectRecords('i-i-s-gorvodokanal-team', 'TeamL', {index: teamIndex}, 'teamList');
      currentTeam = currentTeam[0];
      context.setProperties({
          teamShiftInfo: {
              start: currentTeam.get('shiftStart').getUTCHours(),
              end: currentTeam.get('shiftEnd').getUTCHours() - 1,
          }
      });

      nonSelectedRequests = await this.selectRecords('i-i-s-gorvodokanal-request', 'RequestL', {team: null});

      let dateStart = dateShift(0, date);
      let dateEnd = dateShift(6, date);

      let requests = await this.selectRecords('i-i-s-gorvodokanal-request', 'RequestL', {});
      requests.forEach((request) => {
        let requestDate = new Date(request.get('dateStart'));

        if (requestDate && request.get('team')) {
          requestDate = dateNullable(requestDate);

          if ((dateStart.getTime() <= requestDate.getTime())
              && (requestDate.getTime() <= dateEnd.getTime())
              && (request.get('team').get('index') === Number(context.get('inputTeamId')))) {

              selectedRequests.push(request);
              for (let i = 0; i < 7; i++) {
                  dates[i].count = dates[i].date === dateForm(requestDate) ? dates[i].count + 1 : dates[i].count;
              }
          }
        }
      });

      nonSelectedRequests = requestCanBeDone(currentTeam, nonSelectedRequests, selectedRequests, date);
      let lastRequest = getLastRequest(selectedRequests, date, currentTeam);

      context.setProperties({
          isTasksCreated: true,
          requestList: selectedRequests,
          freeRequestList: nonSelectedRequests,
          requestList: selectedRequests,
          taskCount: dates,
          lastRequest: lastRequest,
      });

      context.showTable();
  },

  showTable() {
      let newDate = this.get('date').value;

      let newDateId = newDate.getDay() - 1;
      newDateId = newDateId === -1 ? 6 : newDateId;

      this.setProperties({
          isShowTable: true,
          date: {
              id: newDateId,
              value: dateNullable(newDate)
          }
      });

      if (this.currentDate === '') {
          this.setProperties({
              currentDate: this.date.value,
          });
      }
  }
});
