import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

export default theme => {
  return makeStyles(theme => {
    return {
      userLable: {
        marginRight: theme.spacing(1),
      },
      rootZoom: {
        position: 'fixed',
        top: theme.spacing(8),
        right: theme.spacing(4),
      },
      rootTabs: {
        display: 'flex',
        minHeight: 22,
        overflow: 'hidden',
      },
      rootTab: {
        border: 0,
        height: 20,
        fontSize: '12px',
        padding: '0px',
        margin: '3px',
        minHeight: 20,
      },
      root: {
        display: 'flex',
      },
      toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      menuButtonHidden: {
        display: 'none',
      },
      title: {
        flexGrow: 1,
      },
      drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      },
      appBarSpacer: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
      },
      container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      paper1: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 200,
      },
    };
  })();
};
