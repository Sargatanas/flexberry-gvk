import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
import dateForm from '../utils/date-form';
import dateNullable from '../utils/date-nullable';

export default Ember.Controller.extend({
  topCrashAdresses: null,
  teamCompletedRequests: null,
  totalTimePerMonth: null,
  topStandingTeams: null,

  async init() {
    this._super(...arguments);

    let list = [{
      name: 'i-i-s-gorvodokanal-request',
      projectionName: 'RequestL',
      property: 'requests'
    }, {
      name: 'i-i-s-gorvodokanal-address',
      projectionName: 'AddressL',
      property: 'addresses'
    }, {
      name: 'i-i-s-gorvodokanal-team',
      projectionName: 'TeamL',
      property: 'teams'
    }, {
      name: 'i-i-s-gorvodokanal-task',
      projectionName: 'TaskL',
      property: 'tasks'
    }];

    let topCrashAdresses = await this.getTopCrashAddresses(5);
    let teamCompletedRequests = await this.getTeamCompletedRequests();
    let totalTimePerMonth = await this.getTotalTimePerMonth();
    let topStandingTeams = await this.getTopStandingTeams(5);
    console.log('topStandingTeams', topStandingTeams);
    this.setProperties({
      'topCrashAdresses': topCrashAdresses,
      'teamCompletedRequests': teamCompletedRequests,
      'totalTimePerMonth': totalTimePerMonth,
      'topStandingTeams': topStandingTeams,
    });
  },

  async getRecords(name, projectionName, property) {
    let store = this.store;
    let builder = new Query.Builder(store, name);

    builder.selectByProjection(projectionName);
    let result = await store.query(name, builder.build());

    if (property) {
      this.set(property, result);
    }

    return result;
  },

  sumDates(firstDate, secondDate) {
    let result = new Date(dateForm(firstDate));
    result.setHours(firstDate.getHours() + secondDate.getHours());
    result.setMinutes(firstDate.getMinutes() + secondDate.getMinutes());
    result.setSeconds(firstDate.getSeconds() + secondDate.getSeconds());
    return result;
  },

  subDates(firstDate, secondDate) {
    let result = new Date(dateForm(firstDate));
    result.setHours(firstDate.getHours() - secondDate.getHours());
    result.setMinutes(firstDate.getMinutes() - secondDate.getMinutes());
    result.setSeconds(firstDate.getSeconds() - secondDate.getSeconds());
    return result;
  },

  /* БД 1 */
  async getTopCrashAddresses(count) {
    let addresses = await this.getRecords('i-i-s-gorvodokanal-address', 'AddressL');
    let requests = await this.getRecords('i-i-s-gorvodokanal-request', 'RequestL');

    let addressesCount = [];
    addresses.forEach((address) => {
      addressesCount.push({
        address: address,
        count: 0
      });
    });

    requests.forEach((request) => {
      let address = request.get('address');

      addressesCount.forEach((addressCount) => {
        if (addressCount.address.get('id') === address.get('id')) {
          addressCount.count++;
        }
      });
    });

    addressesCount.sort((a, b) => {
      return b.count - a.count;
    });

    return addressesCount.slice(0, count);
  },

  /* БД 2 */
  async getTeamCompletedRequests() {
    let requests = await this.getRecords('i-i-s-gorvodokanal-request', 'RequestL');
    let teams = await this.getRecords('i-i-s-gorvodokanal-team', 'TeamL');

    let teamsCount = [];
    teams.forEach((team) => {
      teamsCount.push({
        team: team,
        count: 0
      });
    });

    requests.forEach((request) => {
      let team = request.get('team');

      if (team) {
        teamsCount.forEach((teamCount) => {
          if ((teamCount.team.get('id') === team.get('id')) && (request.get('isCompleted'))) {
            teamCount.count++;
          }
        });
      }
    });

    teamsCount.sort((a, b) => {
      return b.count - a.count;
    });

    return teamsCount;
  },

  /* БД 4 */
  async getTotalTimePerMonth() {
    let requests = await this.getRecords('i-i-s-gorvodokanal-request', 'RequestL');
    let teams = await this.getRecords('i-i-s-gorvodokanal-team', 'TeamL');
    let monthNames = [{
      en: 'January', ru: 'Январь'
    }, {
      en: 'February', ru: 'Февраль'
    },{
      en: 'March', ru: 'Март'
    },{
      en: 'April', ru: 'Апрель'
    },{
      en: 'May', ru: 'Май'
    },{
      en: 'June', ru: 'Июнь'
    },{
      en: 'July', ru: 'Июль'
    },{
      en: 'August', ru: 'Август'
    },{
      en: 'September', ru: 'Сентябрь'
    },{
      en: 'October', ru: 'Октябрь'
    },{
      en: 'November', ru: 'Ноябрь'
    },{
      en: 'December', ru: 'Декабрь'
    },];

    let monthList = {};
    requests.forEach((request) => {
      if (request.get('isCompleted')) {
        let start = request.get('dateStart');
        let end = request.get('dateEnd');
        let duration = this.subDates(end, start);
        let team = request.get('team');

        let month = start.getUTCMonth();

        if (Object.keys(monthList).includes(String(month))) {
          let monthElement = monthList[month];
          let date = monthElement.defaultDate;
          let completed = false;

          monthElement.content.forEach((element) => {
            if (element.team.get('id') === team.get('id')) {
              element.total = this.sumDates(element.total, duration);
              completed = true;
            }
          });

          if (!completed) {
            monthElement.content.push({
              team: team,
              total: this.sumDates(date, duration)
            });
          }
        } else {
          monthList[month] = {}; // заводим новый блок под месяц
          let monthElement = monthList[month]; // получаем объект
          monthElement['name'] = monthNames[month];
          monthElement['content'] = [];

          let date = new Date(); // получаем первую дату месяца (только текущий год)
          date = dateNullable(date);
          date.setMonth(month);
          date.setDate(1);
          monthElement['defaultDate'] = date;

          let content = {
            team: request.get('team'),
            total: this.sumDates(date, duration)
          };
          monthElement.content.push(content); // заполняем первую запись о бригаде
        }
      }
    });

    teams.forEach((team) => {
      for (let key in monthList) {
        let monthElement = monthList[key];
        let date = monthElement.defaultDate;
        let isInclude = false;

        monthElement.content.forEach((element) => {
          if (element.team.get('id') === team.get('id')) {
            isInclude = true;
          }
        });

        if (!isInclude) {
          monthElement.content.push({
            team: team,
            total: date
          });
        }
      };
    });

    let monthArray = [];
    for (let key in monthList) {
      monthArray.push(monthList[key]);
    }
    return monthArray;
  },

  /* БД 5 */
  async getTopStandingTeams(count) {
    let monthList = await this.getTotalTimePerMonth();
    let teams = await this.getRecords('i-i-s-gorvodokanal-team', 'TeamL');

    let date = new Date(); // получаем первую дату текущего года
    date = dateNullable(date);
    date.setMonth(0);
    date.setDate(1);

    let totalTimeList = {};
    teams.forEach((team) => {
      totalTimeList[team.get('index')] = {
        team: team,
        total: date
      };
    });

    monthList.forEach((monthElement) => {
      monthElement.content.forEach((element) => {
        if (element.team) {
          let index = element.team.get('index');
          let time = element.total;
          totalTimeList[index].total = this.sumDates(totalTimeList[index].total, time);
        }
      });
    });

    let topStandigTeams = [];
    for (let key in totalTimeList) {
      let element = totalTimeList[key];
      topStandigTeams.push(element);
    }
    topStandigTeams.sort((a, b) => {
      return a.total - b.total;
    });

    return topStandigTeams.slice(0, count);
  }
});
