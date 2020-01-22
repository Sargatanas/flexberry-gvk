import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
import dateForm from '../utils/date-form';
import dateNullable from '../utils/date-nullable';

import config from '../config/environment';

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


    let topCrashAdresses = await this.getTopCrashAddresses();
    let teamCompletedRequests = await this.getTeamCompletedRequests();
    let totalTimePerMonth = await this.getTotalTimePerMonth();
    let topStandingTeams = await this.getTopStandingTeams(5);
    this.setProperties({
      'topCrashAdresses': topCrashAdresses,
      'teamCompletedRequests': teamCompletedRequests,
      'totalTimePerMonth': totalTimePerMonth,
      'topStandingTeams': topStandingTeams,
    });
  },

  async getRecords(url) {
    let result = await Ember.$.ajax({
      type: 'GET',
      xhrFields: { withCredentials: true },
      url: `${config.APP.backendUrls.api}/${url}`,
      success(result) {
      },
      error(reject) {
        console.log(reject);
      },
    });
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
  async getTopCrashAddresses() {
    let rawCrashAdresses = await this.getRecords('getTopEmergencyAddresses');
    let store = this.store;
    let topCrashAdresses = [];
    rawCrashAdresses.forEach((rawCrashAddress) => {
      let rawAddress = JSON.parse(rawCrashAddress);
      let address = store.createRecord('i-i-s-gorvodokanal-address', {
        district: rawAddress.district,
        street: rawAddress.street,
        house: rawAddress.house,
        build: rawAddress.build,
        porch: rawAddress.porch,
        floor: rawAddress.floor,
        apartment: rawAddress.apartment,
        count: rawAddress.count
      });
      topCrashAdresses.push(address);
    });
    return topCrashAdresses;
  },

  /* БД 2 */
  async getTeamCompletedRequests() {
    let rawTeamCompletedRequests = await this.getRecords('getTeamCompletedRequests');
    let store = this.store;
    let teamCompletedRequests = [];
    rawTeamCompletedRequests.forEach((rawTeamCompletedRequest) => {
      let rawTeam = JSON.parse(rawTeamCompletedRequest);
      let team = store.createRecord('i-i-s-gorvodokanal-team', {
        index: rawTeam.teamIndex,
        count: rawTeam.count
      });
      teamCompletedRequests.push(team);
    });
    return teamCompletedRequests;
  },

  /* БД 4 */
  async getTotalTimePerMonth() {
    let rawTeamTotalTime = await this.getRecords('getTotalTimePerMonth');
    let store = this.store;

    let monthNames = [{
      en: 'January', ru: 'Январь'
    }, {
      en: 'February', ru: 'Февраль'
    }, {
      en: 'March', ru: 'Март'
    }, {
      en: 'April', ru: 'Апрель'
    }, {
      en: 'May', ru: 'Май'
    }, {
      en: 'June', ru: 'Июнь'
    }, {
      en: 'July', ru: 'Июль'
    }, {
      en: 'August', ru: 'Август'
    }, {
      en: 'September', ru: 'Сентябрь'
    }, {
      en: 'October', ru: 'Октябрь'
    }, {
      en: 'November', ru: 'Ноябрь'
    }, {
      en: 'December', ru: 'Декабрь'
    },];

    let teamTotalTime = {};
    rawTeamTotalTime.forEach((element) => {
      let rawTeam = JSON.parse(element);

      let rawDuration = rawTeam.fullDuration.split(':');
      let duration = new Date();
      duration.setHours(Number(rawDuration[0]));
      duration.setMinutes(Number(rawDuration[1]));
      duration.setSeconds(Number(rawDuration[2]));

      let team = store.createRecord('i-i-s-gorvodokanal-team', {
        index: rawTeam.teamIndex,
        total: duration
      });

      if (Object.keys(teamTotalTime).indexOf(rawTeam.month) === -1) {
        teamTotalTime[rawTeam.month] = {
          name: monthNames[Number(rawTeam.month) - 1],
          content: []
        };
      }
      teamTotalTime[rawTeam.month].content.push(team);
    });

    let result = [];
    for (let key in teamTotalTime) {
      result.push(teamTotalTime[key]);
    }

    return result;
  },

  /* БД 5 */
  async getTopStandingTeams() {
    let rawTopStandingTeams = await this.getRecords('getTopStandingTeams');
    let store = this.store;
    let topStandingTeams = [];
    rawTopStandingTeams.forEach((rawTopStandingTeam) => {
      let rawTeam = JSON.parse(rawTopStandingTeam);

      let rawDuration = rawTeam.fullDuration.split(':');
      let duration = new Date();
      duration.setHours(Number(rawDuration[0]));
      duration.setMinutes(Number(rawDuration[1]));
      duration.setSeconds(Number(rawDuration[2]));

      let team = store.createRecord('i-i-s-gorvodokanal-team', {
        index: rawTeam.teamIndex,
        total: duration
      });
      topStandingTeams.push(team);
    });
    return topStandingTeams;
  }
});
