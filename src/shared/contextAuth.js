/* eslint-disable eqeqeq */
import React, { useReducer } from 'react';

import AuthService from './services/AuthService';

const GET_USER = 'GET_USER';
const SET_ERR = 'SET_ERR';
const LOGIN_USER = 'LOGIN_USER';

const AuthContext = React.createContext();

const initialState = { user: null, err: null };

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case GET_USER:
      return { ...state, user: action.payload, err: null };
    case SET_ERR:
      return { ...state, user: null, err: action.payload };
    default:
      return state;
  }
};

const logInUser = async dispatch => {
  const authService = new AuthService();
  console.log('logInUser');
  try {
    const result = await authService.login();

    console.log('result:', result);

    const user = await authService.getUser();

    console.log('logInUser 1:', user);
    dispatch(LOGIN_USER, user);
  } catch (ex) {
    console.log(ex);
    dispatch(SET_ERR, 'Error login user: ' + ex.toString());
  }
};

const getUser = async dispatch => {
  const authService = new AuthService();

  try {
    const user = await authService.getUser();
    dispatch(GET_USER, user);
  } catch (ex) {
    console.log(ex);
    dispatch(SET_ERR, 'Error getting user: ' + ex.toString());
  }
};

// eslint-disable-next-line react/prop-types
function ContextAuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, ContextAuthProvider, logInUser };
