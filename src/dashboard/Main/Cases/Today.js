import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { EventsContext, getEventsAction } from '../../../shared/context';
import BorderLinearProgress from '../Chart/BorderLinearProgress';
import Cases from './Cases';
import useInterval from '../../../shared/utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    height: 20,
  },
}));

function Today() {
  const { state, dispatch } = useContext(EventsContext);
  const [delay, setDelay] = useState(1);
  const classes = useStyles();

  useInterval(() => {
    getEventsAction(dispatch, state);

    setDelay(60);
  }, delay * 1000);

  if (!state.events.length) {
    return (
      <div className={classes.root}>
        <BorderLinearProgress />
      </div>
    );
  } else {
    return <Cases data={state.events}></Cases>;
  }
}

export default Today;
