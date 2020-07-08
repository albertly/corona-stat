import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';

import { EventsContext } from '../../shared/context';

function Totals() {
  const { state } = useContext(EventsContext);
  const style = { margin: 0, padding: 0 };

  return (
    <React.Fragment>
      <Typography
        variant="subtitle1"
        color="primary"
        gutterBottom
        style={style}
      >
        Cases Total:
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={style}>
        {state.total}
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary"
        gutterBottom
        style={style}
      >
        New Cases:
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={style}>
        {state.new}
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary"
        gutterBottom
        style={style}
      >
        New Deaths:
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={style}>
        {state.deaths}
      </Typography>
    </React.Fragment>
  );
}

export default React.memo(Totals);
