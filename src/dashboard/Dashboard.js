import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Totals from './Totals';
import Counter from '../counter';
import Yesterday from '../yesterday';
import News from './News';
import Copyright from './Copyright';
import TabPanel from './TabPanel';
import ScrollTop from './ScrollTop';

import { getRandomInt } from '../shared/utils';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
    height: 240,
  },
  switchBase1: {
    display: 'none'
  },

}));

const URL = process.env.REACT_APP_WS_URL;

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [darkTheme_, setDarkTheme_] = React.useState(localStorage.getItem('darkTheme') === 'true');
  const [refreshGraph, setRefreshGraph] = React.useState(true);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    console.log('in useEffect');
    let ws;
    let counter = 0;

    function Connect(ws) {
      if (counter > 50000) {
        return;
      }
      ws = new WebSocket(URL);
      //ws.open(URL);
      console.log('connected', ws, counter);

      ws.onopen = () => {
        counter = 0;
        console.log('my msg');
        ws.send('my msg');
      };

      ws.onmessage = (event) => {
        // const response = JSON.parse(event.data);
        setRefreshGraph(true);
        console.log('ws onmessage', event.data);
      };

      ws.onclose = () => {
        counter += 1;
        setTimeout(() => Connect(ws), 1000 * getRandomInt(1, counter));
        console.log("ws close");
      };

    }

    Connect(ws);

    return () => {
      //ws.close();
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleRefreshGraph = () => {
    setRefreshGraph(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const darkTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkTheme_ ? 'dark' : 'light',
        },
      }),
    [darkTheme_],
  );

  const handleThemeChange = event => {
    localStorage.setItem('darkTheme', darkTheme_ === true ? 'false' : 'true');
    setDarkTheme_(!darkTheme_);

  };

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <div className={classes.root}> */}
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>

            COVID-19 CORONAVIRUS PANDEMIC
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={darkTheme_}
                color="default" onChange={handleThemeChange}
                name="checkedA" checkedIcon={<Brightness7Icon />} icon={<Brightness4Icon />}
                classes={{
                  root: classes.root,
                  switchBase: classes.switchBase,
                  thumb: classes.thumb,
                  checked: classes.checked,
                }} />}
              label={`Change to ${darkTheme_ ? "light" : "dark"}`}
            />
          </FormGroup>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </SwipeableDrawer>
      {/* <main className={classes.content}> */}
      <div className={classes.appBarSpacer} id="back-to-top-anchor" />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={4}>
          {/* Totals */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Totals />
            </Paper>
          </Grid>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={fixedHeightPaper}>
              <Chart refreshGraph={refreshGraph} onRefreshGraph={handleRefreshGraph} />
            </Paper>
          </Grid>
          {/* News */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <News />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            {/* <Paper className={classes.paper1}> */}
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example">
              <Tab label="Now" />
              <Tab label="Yesterday" />
            </Tabs>
            <SwipeableViews
              index={value}
              animateTransitions={false}
              onChangeIndex={handleChangeIndex}>
              <TabPanel value={value} index={0}>
                <Counter />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Yesterday />
              </TabPanel>
            </SwipeableViews>
            {/* </Paper> */}
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

    </ThemeProvider>
  );
}
