import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';

import { EventsContext } from '../shared/context';
import Title from './Title';

export default function Deposits() {
  const { state } = useContext(EventsContext);
  return (
    <React.Fragment>
      <Title>Cases Total:</Title>
      <Typography component="p" variant="h6">
        {state.total}
      </Typography>
      <Title>New Today Total:</Title>
      <Typography component="p" variant="h6">
        {state.new}
      </Typography>
      <Title>Deaths:</Title>
      <Typography component="p" variant="h6">
        13,697
      </Typography>
    </React.Fragment>
  );
}
