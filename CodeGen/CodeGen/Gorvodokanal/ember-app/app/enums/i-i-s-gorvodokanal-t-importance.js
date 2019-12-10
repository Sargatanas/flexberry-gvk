import { createEnum } from 'ember-flexberry-data/utils/enum-functions';

export default createEnum({
  NotImportant: 'не срочно (0)',
  LowImportance: 'малая срочность (1)',
  MiddleImportance: 'средняя срочность (2)',
  HighImportance: 'высокая срочность (3)',
  ExtrimlyImportant: 'как можно скорее (4)'
});
