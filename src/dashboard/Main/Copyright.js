import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import appInfo from '../../../package.json';

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="https://www.worldometers.info/coronavirus/">
           Data from www.worldometers.info
        </Link>{' - '}  Corona Statistics v{appInfo.version}
      </Typography>
    );
  }