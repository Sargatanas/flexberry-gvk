import Ember from 'ember';
import dateForm from '../utils/date-form';

export default Ember.Component.extend({
    isOpen: false,
    taskClass: '',

    actions: {
        toggleTask() {
            switch (this.get('requestClass')) {
                case 'element-body-task_resize':
                    this.setProperties({
                        isOpen: true,
                        requestClass: 'element-body-task_open'
                    });
                    break;
                case 'element-body-task_open':
                    this.setProperties({
                        isOpen: false,
                        requestClass: 'element-body-task_resize'
                    });
                    break;
                default:
                    break;
            }
        },

        appoint(request, teamList, lastRequest) {
          /* this.set('isShowTable', false); */
          let team = teamList[0];
          request.set('team', team);
          request.set('isAppointed', 'назначено');

          let dateStart = new Date(dateForm(lastRequest.end));
          dateStart.setHours(dateStart.getHours() + lastRequest.shift);
          request.set('dateStart', dateStart);
          request.set('planeDateStart', null);

          request.save();
          this.set('free', false);
          this.set('reestablish', false);
          this.set('shadowRequestClass', '');
          this.set('reestablishRequestClass', '');

          this.set('isShowTable', true);
        },

        disappoint(request) {/*
          this.set('isShowTable', false); */
          request.set('team', null);
          request.set('isAppointed', 'не назначено');

          request.save();

          this.set('reestablish', true);
          this.set('reestablishRequestClass', 'element-body-task_reestablish');

          this.setProperties({
            isOpen: false,
            requestClass: 'element-body-task_resize'
          });

          this.set('isShowTable', true);
        },
    },
});
