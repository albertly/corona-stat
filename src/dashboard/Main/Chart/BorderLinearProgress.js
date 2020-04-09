import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
    },
    bar: {
      borderRadius: 20,
  
    },
  })(LinearProgress);


export default BorderLinearProgress;