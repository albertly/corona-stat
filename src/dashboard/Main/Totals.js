import React, { useContext  } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { EventsContext } from '../../shared/context';

function Totals() {
  const { state, _ } = useContext(EventsContext);
 // const classes = useStyles();
  return (
    <React.Fragment>
    <Typography variant="subtitle1" color="primary" gutterBottom style={{margin: 0, padding: 0}}>
     Cases Total:
     </Typography>
      <Typography variant="subtitle1" gutterBottom style={{margin: 0, padding: 0}}>
        {state.total}
      </Typography>
      <Typography variant="subtitle1" color="primary" gutterBottom style={{margin: 0, padding: 0}}>
      New Cases:
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{margin: 0, padding: 0}}>
        {state.new}
      </Typography>
      <Typography variant="subtitle1" color="primary" gutterBottom style={{margin: 0, padding: 0}}>
      New Deaths:
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{margin: 0, padding: 0}}>
        {state.deaths}
      </Typography>

    </React.Fragment>
  );
}

export default React.memo(Totals);