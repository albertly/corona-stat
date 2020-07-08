import React, { useContext } from 'react';
import { EventsContext } from '../../shared/context';

import Typography from '@material-ui/core/Typography';
import Title from '../Title';

function News() {
  const { state } = useContext(EventsContext);

  return (
    <React.Fragment>
      <Title>News:</Title>
      <marquee direction="down" behavior="scroll" scrollamount="1">
        {state.delta.map(row => (
          <Typography
            key={`${row.country}${row.new}`}
            variant="subtitle1"
            gutterBottom
          >
            {`${row.country} ${row.new ? row.new : 0} (${
              row.newOld ? row.newOld : 0
            })`}
          </Typography>
        ))}
        <p></p>
      </marquee>
    </React.Fragment>
  );
}

export default React.memo(News);
