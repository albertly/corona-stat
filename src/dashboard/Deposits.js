import React, { useContext  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { EventsContext } from '../shared/context';

import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const { state, dispatch } = useContext(EventsContext);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Cases Total:</Title>
      <Typography component="p" variant="h6">
        {state.total}
      </Typography>
      <Title>New Today Total:</Title>
      <Typography component="p" variant="h6" >
        {state.new}
      </Typography>
      <Title>Deaths:</Title>
      <Typography component="p" variant="h6">
        13,697
      </Typography>

    </React.Fragment>
  );
}
