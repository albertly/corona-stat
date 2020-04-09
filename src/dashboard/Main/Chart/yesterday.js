import React, { useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import { EventsContext, getYesterdayEventsAction } from '../../../shared/context';
import BorderLinearProgress from './BorderLinearProgress';
import Cases from '../Cases/Cases';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      height: 20,
  },
}));

function Yesterday() {
  const { state, dispatch } = useContext(EventsContext);
  const classes = useStyles();
  
  useEffect(() => {
    getYesterdayEventsAction(dispatch);
  }, []);

  if (!state.eventsYesterday.length) {
    return (
      <div className={classes.root}>
        <BorderLinearProgress />
      </div>
    );
  } else {
    return (
      <Cases data={state.eventsYesterday}></Cases>
    );
  }
}

export default Yesterday;