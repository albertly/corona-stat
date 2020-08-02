import React, { useContext } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { EventsContext } from '../../shared/context';
import appInfo from '../../../package.json';

function Copyright() {
  const { state } = useContext(EventsContext);
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://www.worldometers.info/coronavirus/">
        Data from www.worldometers.info
      </Link>
      {' - '} Corona Statistics v{`${appInfo.version} `} Last Update:{' '}
      {state.lastUpdate}
    </Typography>
  );
}

export default React.memo(Copyright);
