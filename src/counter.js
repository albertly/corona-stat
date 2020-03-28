import React, { useContext, useState, useEffect, useRef } from "react";

import { EventsContext, getEventsAction } from './shared/context';
import Cases from './dashboard/Cases';
import useInterval from './shared/utils';

function swap(arra) {

  if (arra === undefined || arra.length == 0) {
    return arra;
  }
  let a = JSON.parse(JSON.stringify(arra));

  a =  [a[a.length - 1], ...a.slice(0, -1)]

  return a;
}


function Counter() {
  const { state, dispatch } = useContext(EventsContext);
  const [data, setData] = useState([]);
  const [disData, setDisData] = useState([]);
  const [delay, setDelay] = useState(1);

  useInterval(() => {
    getEventsAction(dispatch);
  
    setDelay(30);
  }, delay * 1000);

  return (<Cases data={state.events}></Cases>);
}

export default Counter;