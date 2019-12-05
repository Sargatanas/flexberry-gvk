export default {
  projections: {
    RequestE: {
      index: {
        __caption__: 'Номер заявки'
      },
      address: {
        __caption__: 'Адрес',
        street: {
          __caption__: 'Улица'
        },
        house: {
          __caption__: 'Дом'
        },
        build: {
          __caption__: 'Корпус'
        },
        floor: {
          __caption__: 'Этаж'
        },
        flat: {
          __caption__: 'Квартира'
        }
      },
      isCompleted: {
        __caption__: 'Отметка о закреплении'
      },
      team: {
        __caption__: 'Бригада',
        index: {
          __caption__: 'Номер бригады'
        }
      },
      isAppointed: {
        __caption__: 'Отметка о выполнении'
      },
      realDuration: {
        __caption__: 'Фактическая длительность работ'
      },
      tasks: {
        __caption__: 'Задачи',
        code: {
          __caption__: 'Code'
        },
        content: {
          __caption__: 'Content'
        },
        planeDuration: {
          __caption__: 'Plane duration'
        }
      }
    },
    RequestL: {
      index: {
        __caption__: 'Номер заявки'
      },
      address: {
        __caption__: 'Улица',
        street: {
          __caption__: 'Улица'
        },
        house: {
          __caption__: 'Дом'
        },
        build: {
          __caption__: 'Корпус'
        },
        floor: {
          __caption__: 'Этаж'
        },
        flat: {
          __caption__: 'Квартира'
        }
      },
      isAppointed: {
        __caption__: 'Отметка о прикреплении'
      },
      team: {
        __caption__: 'Номер выполняющей бригады',
        index: {
          __caption__: 'Номер выполняющей бригады'
        }
      },
      isCompleted: {
        __caption__: 'Отметка о выполнении'
      },
      realDuration: {
        __caption__: 'Фактическая длительность работ'
      },
      tasks: {
        __caption__: 'Задачи',
        code: {
          __caption__: 'Code'
        },
        content: {
          __caption__: 'Content'
        },
        planeDuration: {
          __caption__: 'Plane duration'
        }
      }
    }
  }
};
