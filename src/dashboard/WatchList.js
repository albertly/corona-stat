import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import AuthService from '../shared/services/AuthService';
import ApiService from '../shared/services/ApiService';

import { countryCodes } from '../shared/CountryCodes';
import { Flag } from '../shared/utils';

const useStyles = makeStyles(theme => ({
  list: {
    [theme.breakpoints.down('xl')]: {
      width: '25vw',
      height: '60vh',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      width: '30vw',
      height: '60vh',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60vw',
      height: '60vh',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
  },
}));

//ToDo: what is selectedValue ?
export default function WatchList(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [countries, setCountries] = useState({});
  const [search, setSearch] = useState('');

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const descriptionElementRef = useRef(null);

  const handleChange = event => {
    const c = { ...countries, [event.target.name]: event.target.checked };

    console.log('handleChange 1');
    setCountries(c);

    const authService = new AuthService();

    authService.getUser().then(u => {
      console.log('handleChange 2');
      if (u) {
        //  setUser(u);
        console.log('handleChange 3');
        if (!('Notification' in window)) {
          console.log('This browser does not support desktop notification');
        } else {
          Notification.requestPermission();
          console.log('requestPermission');
        }

        console.log('handleChange 4');
        const sub = localStorage.getItem('sub');
        if (sub) {
          console.log('handleChange 5');
          const apiService = new ApiService();

          const subO = JSON.parse(sub);
          const notifyFor = Object.keys(c).filter(k => c[k]);
          console.log('handleChange 6 ', notifyFor);
          subO.countries = notifyFor;

          apiService.callApi(JSON.stringify(subO)).then(
            r => console.log('Api call ', r),
            e => console.log('Api call error ', e)
          );
        }
        console.log('User has been successfully loaded from store. 1', u);
      } else {
        //  setUser(null);
        console.log('Cannot get user');
      }
    });

    localStorage.setItem('countries', JSON.stringify(c));
    console.log('handleChange End');
  };

  useEffect(() => {
    const countriesStr = localStorage.getItem('countries');
    if (!countriesStr) {
      const c = {};
      countryCodes.map(e => {
        c[e.Name] = false;
      });
      setCountries(c);
      localStorage.setItem('countries', JSON.stringify(c));
    } else {
      setCountries(JSON.parse(countriesStr));
    }
  }, []);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <TextField
            id="search"
            label="Search"
            value={search}
            onChange={handleSearch}
          />
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <List className={classes.list} dense component="div" role="list">
              {countryCodes
                .filter(
                  el =>
                    el.Name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                )
                .map(e => (
                  <ListItem button onClick={() => {}} key={e.Name}>
                    {Flag(e.Name, false)}

                    <ListItemText
                      primary={e.Name}
                      style={{ marginLeft: '4px' }}
                    />

                    <Checkbox
                      color="primary"
                      checked={countries[e.Name]}
                      onChange={handleChange}
                      name={e.Name}
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </ListItem>
                ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
