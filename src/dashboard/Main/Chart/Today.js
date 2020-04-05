import React, { useContext, useState } from "react";

import { EventsContext, getEventsAction } from '../../../shared/context';
import Cases from '../Cases/Cases';
import useInterval from '../../../shared/utils';


function Today() {
  const { state, dispatch } = useContext(EventsContext);
  const [delay, setDelay] = useState(1);

  useInterval(() => {
    getEventsAction(dispatch);
  
    setDelay(30);
  }, delay * 1000);

  return (<Cases data={state.events}></Cases>);
}

export default Today;