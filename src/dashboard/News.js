import React, { useContext } from 'react';
import { EventsContext } from '../shared/context';

import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function News({ data }) {
  const { state } = useContext(EventsContext);
  return (
    <React.Fragment>
      <Title>News:</Title>
      <marquee direction="down" behavior="scroll" scrollamount="1">
        {state.delta.map(row => (
          <Typography component="p" variant="h6">
            {`${row.country} ${row.new} (${row.newOld})`}
          </Typography>
        ))}
        <p></p>
      </marquee>
    </React.Fragment>
  );
}
