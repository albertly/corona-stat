import React, { useContext, useEffect } from "react";

import { EventsContext, getYesterdayEventsAction } from '../../shared/context';
import Cases from './Cases/Cases';


function Yesterday() {
  const { state, dispatch } = useContext(EventsContext);

  useEffect(() => {
    getYesterdayEventsAction(dispatch);
  }, []);

  return (<Cases data={state.eventsYesterday}></Cases>);
}

export default Yesterday;