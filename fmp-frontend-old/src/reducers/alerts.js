import { DISMISS_ALERT } from '../actions/alerts';

const defaultState = {
  alertsList: [
    {
      id: 0,
      title: 'This Week',
      value: 16,
      color: 'primary',
      footer: 'The week has only started',
    },
    {
      id: 1,
      title: 'Next week',
      value: 23,
      color: 'danger',
      footer: 'better get planning!',
    },
  ],
};

export default function alertsReducer(state = defaultState, action) {
  let index;
  switch (action.type) {
    case DISMISS_ALERT:
      state.alertsList.forEach((alert, alertIndex) => {
        if (alert.id === action.id) {
          index = alertIndex;
        }
      });
      return Object.assign({}, state, {
        alertsList: [
          ...state.alertsList.slice(0, index),
          ...state.alertsList.slice(index + 1),
        ],
      });
    default:
      return state;
  }
}
