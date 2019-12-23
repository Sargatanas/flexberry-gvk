import Ember from 'ember';

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
          let team = teamList[0];
          request.set('team', team);
          request.set('isAppointed', 'назначено');

          let dateStart = lastRequest.get('dateStart').getHours() + 1;
          request.set('dateStart', request.get('planeDateStart'));

          request.save();
        },

        disappoint(request) {
          request.set('team', null);
          /* request.set('dateStart', null); */
          request.set('isAppointed', 'не назначено');
          request.save();
        },
    }
});
