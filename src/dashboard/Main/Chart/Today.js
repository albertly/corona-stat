import React, { useContext, useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { EventsContext, getEventsAction } from '../../../shared/context';
import Cases from '../Cases/Cases';
import useInterval from '../../../shared/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      height: 20,
  },
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
  },
  bar: {
    borderRadius: 20,

  },
})(LinearProgress);

function Today() {
  const { state, dispatch } = useContext(EventsContext);
  const [delay, setDelay] = useState(1);
  const classes = useStyles();

  useInterval(() => {
    getEventsAction(dispatch);

    setDelay(30);
  }, delay * 1000);

  if (!state.events.length) {
    return (
      <div className={classes.root}>
        <BorderLinearProgress />
      </div>
    );
  } else {
    return (
      <Cases data={state.events}></Cases>
    );
  }
}

export default Today;