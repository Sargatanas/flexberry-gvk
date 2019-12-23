import Ember from 'ember';

export default Ember.Component.extend({
    isOpen: false,
    taskClass: '',

    taskServe: Ember.inject.service('task'),

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
    }
});
