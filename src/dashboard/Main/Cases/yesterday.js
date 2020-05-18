import React, { useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import { EventsContext, getYesterdayEventsAction } from '../../../shared/context';
import BorderLinearProgress from '../Chart/BorderLinearProgress';
import Cases from './Cases';

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


    return !state.eventsYesterday.length ? (
      <div className={classes.root}>
        <BorderLinearProgress />
      </div>
    ) : (
      <Cases data={state.eventsYesterday}></Cases>
    );

}

export default React.memo(Yesterday);