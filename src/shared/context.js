/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useReducer } from 'react';
import axios from 'axios';

import { todayFormated, columns } from './utils';

const SET_COLUMNS = 'SET_COLUMNS';

const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

const GET_YESTERDAY_EVENTS_SUCCESS = 'GET_YESTERDAY_EVENTS_SUCCESS';
const GET_YESTERDAY_EVENTS_FAILURE = 'GET_YESTERDAY_EVENTS_FAILURE';

const NOP = 'NOP';
const SET_SCROLL_POS = 'SET_SCROLL_POS';

const EventsContext = React.createContext();

const initializeColumns = () => {
  const columnsStr = localStorage.getItem('columns');
  if (!columnsStr) {
    const colArr = [...columns.map(e => e.name)];
    localStorage.setItem('columns', JSON.stringify(colArr));
    return colArr;
  }

  return JSON.parse(columnsStr);
};

const initialState = {
  events: [],
  delta: [],
  change: [],
  total: '',
  new: '',
  deaths: '',
  eventsYesterday: [],
  today: null,
  errorMessage: '',
  scrollPos: '',
  columns: initializeColumns(),
  lastUpdate: null,
};

function compareArr(new_, old_) {
  const res = [];
  let total = '';
  let newTotal = '';

  if (old_ == undefined || old_.length == 0) {
    return { res: new_, new: newTotal, total };
  }

  new_.forEach(obj => {
    const oldObj = old_.find(e => obj.country == e.country);
    if (oldObj && oldObj.new != obj.new) {
      if (obj.country == 'Total:') {
        total = obj.total;
        newTotal = obj.new;
      } else {
        res.push({ ...obj, newOld: oldObj.new });
      }
    }
  });

  return { res };
}

// ToDo: getEventsAction should mark start action and not allow to run axios when marked.
//      It should run
const reducer = (state, action) => {
  switch (action.type) {
    case SET_COLUMNS:
      return { ...state, columns: action.payload };

    case SET_SCROLL_POS:
      return { ...state, scrollPos: action.payload };

    case GET_YESTERDAY_EVENTS_SUCCESS:
      if (!state.today || todayFormated !== state.today) {
        return {
          ...state,
          eventsYesterday: action.payload,
          today: todayFormated,
          errorMessage: '',
        };
      }
      return state;

    case GET_EVENTS_SUCCESS: {
      const { payload, delta, lastUpdate } = action.payload;
      return {
        ...state,
        events: payload,
        delta: [...delta, ...state.delta].slice(0, 10),
        change: delta, // names !!!
        total: payload[payload.length - 1].total,
        new: payload[payload.length - 1].new,
        deaths: payload[payload.length - 1].newDeaths,
        lastUpdate,
        errorMessage: '',
      };
    }
    case NOP:
      return { ...state, lastUpdate: action.payload };
    case GET_YESTERDAY_EVENTS_FAILURE:
    case GET_EVENTS_FAILURE:
      return { ...state, errorMessage: action.error };
    default:
      return state;
  }
};

const setColumns = (dispatch, col) => {
  localStorage.setItem('columns', JSON.stringify(col));
  dispatch({ type: SET_COLUMNS, payload: col });
};

const setScrollPos = (dispatch, scrollPos) => {
  dispatch({ type: SET_SCROLL_POS, payload: scrollPos });
};

const getYesterdayEventsAction = async dispatch => {
  let response = {};
  try {
    response = await axios.get('/yesterday');
    dispatch({ type: GET_YESTERDAY_EVENTS_SUCCESS, payload: response.data });
  } catch (ex) {
    dispatch({
      type: GET_YESTERDAY_EVENTS_FAILURE,
      error: 'Get Yesterday Events Error',
    });
  }
};

const getEventsAction = async (dispatch, state) => {
  let response = {};
  try {
    response = await axios.get('');
    const { res: delta } = compareArr(response.data, state.events);
    if (delta.length) {
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: {
          payload: response.data,
          delta,
          lastUpdate: response.headers.date,
        },
      });
    } else {
      dispatch({ type: NOP, payload: response.headers.date });
    }
  } catch (ex) {
    dispatch({ type: GET_EVENTS_FAILURE, error: 'Get Events Error' });
  }
};

// eslint-disable-next-line react/prop-types
function ContextEventsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export {
  EventsContext,
  ContextEventsProvider,
  getEventsAction,
  getYesterdayEventsAction,
  setScrollPos,
  setColumns,
};
