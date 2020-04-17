import React, { useEffect, useState, useContext } from 'react';
import { Router, Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import Error404 from './Error/Error404';
import clsx from 'clsx';
import makeStyles from './DashboardCSS';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Popover from '@material-ui/core/Popover';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { MainListItems, secondaryListItems } from './listItems';
import ScrollTop from './ScrollTop';
import Main from './Main/Main';
import DailyCases from './Graph/DailyCases';

import { EventsContext, getEventsAction } from '../shared/context';

import { getRandomInt } from '../shared/utils';

const URL = process.env.REACT_APP_WS_URL;

export default function Dashboard(props) {
  //const hist = useHistory();
  const classes = makeStyles();
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(EventsContext);
  const [darkTheme_, setDarkTheme_] = useState(localStorage.getItem('darkTheme') === 'true');
  const [refreshGraph, setRefreshGraph] = useState(true);
  const [change, setChange] = useState(0);
  const [changeText, setChangeText] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const countriesStr = localStorage.getItem('countries');
    let countries = {};
    let num = 0;
    let changeArr = [];
    if (countriesStr) {
      countries = JSON.parse(countriesStr);
      Object.keys(countries).map(k => {
        if (countries[k]) {
          const index = state.change.findIndex(e => e.country === k);
          if (index !== -1) {
            console.log("Found change ", k, state.change[index]);
            num += 1;
            changeArr.push(state.change[index])
          }
        }
      })
      if (num) {
        num = change + num;
        setChange(num);
        const arr = [...changeText, ...changeArr]
        setChangeText(arr);
        console.log('changeText', arr)
      }

    }
  }, [state.delta])

  useEffect(() => {
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
        ws.send('my msg');
      };

      ws.onmessage = (event) => {
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
  const handleResetChange = (event) => {
    setAnchorEl(event.currentTarget);
  }

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

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? 'simple-popover' : undefined;
  const handleClosePopover = () => {
    setAnchorEl(null);
    setChange(0);
    setChangeText([]);
  }
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
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

            <IconButton color="inherit" onClick={handleResetChange}>
              <Badge badgeContent={change} color="secondary">
                <NotificationsIcon aria-describedby={idPopover} />
              </Badge>
            </IconButton>
            <Popover id={idPopover} open={openPopover} onClose={handleClosePopover} anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {changeText.map(row => (
             
                <Typography key={`${row.country}-${row.new ? row.new : 0}`} variant="caption" display="block" gutterBottom>
                   {`${row.country} ${row.new ? row.new : 0} (${row.newOld ? row.newOld : 0})`} 
                </Typography>
              
              ))}
            </Popover>

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
          <List><MainListItems handleDrawerClose={handleDrawerClose} /></List>
          <Divider />
          <List>{secondaryListItems}</List>
        </SwipeableDrawer>

        <div className={classes.appBarSpacer} id="back-to-top-anchor" />

        <Switch>
          <Route exact path="/" render={() => (
            <Main classes={classes} refreshGraph={refreshGraph} handleRefreshGraph={handleRefreshGraph} />)
          } />

          <Route exact path="/graph/:country?/:new?/:death?/" render={(props) => (
            <DailyCases classes={classes}
              country={props.match.params.country}
              _new={props.match.params.new}
              death={props.match.params.death} />
          )} />
          <Route component={Error404} />

        </Switch>

        <ScrollTop {...props} />

      </ThemeProvider>
    </BrowserRouter>
  );
}
