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
import { useAuth } from 'oidc-react';

import ApiService from '../shared/services/ApiService';

import { countryCodes } from '../shared/CountryCodes';
import { Flag, not } from '../shared/utils';
import { getSubscribtion } from '../shared/PushNotification';

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

export default function WatchList({ onClose, open }) {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [countriesOrig, setCountriesOrig] = useState([]);
  const [search, setSearch] = useState('');
  const auth = useAuth();

  const handleClose = () => {
    onClose();
  };

  const handleCloseAndSave = async () => {
    if (not(countries, countriesOrig).length > 0) {
      const user = auth.userData;
      if (user && !user.expired) {
        const sub = await getSubscribtion();
        if (sub) {
          const apiService = new ApiService(auth);

          sub.countries = countries;

          apiService.callApi(sub).then(
            r => console.log('Api call ', r),
            e => console.log('Api call error ', e) // ToDo: give error to client
          );
        }
      } else if (user && user.expired) {
        alert('Cannot save data. Plz, log in');
      } else {
        localStorage.setItem('countries', JSON.stringify(countries));
      }
    }
    onClose();
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const descriptionElementRef = useRef(null);

  const handleChange = event => {
    const c = [...countries];
    if (event.target.checked) {
      c.push(event.target.name);
    } else {
      const index = c.indexOf(event.target.name);
      if (index > -1) {
        c.splice(index, 1);
      }
    }
    setCountries(c);
  };

  useEffect(() => {
    const getSubscribtionLocal = async () => {
      const pushSub = await getSubscribtion();
      let result = null;
      if (pushSub) {
        const apiService = new ApiService(auth);
        result = await apiService.callGetSubscriber(pushSub);
      }
      return result;
    };

    getSubscribtionLocal().then(result => {
      let c = [];
      if (result.data) {
        c = result.data.countries;
        // ToDo: make login here - if user and user.expired then login
      } else {
        const countriesStr = localStorage.getItem('countries');
        if (countriesStr) {
          c = JSON.parse(countriesStr);
        }
      }
      setCountries(c);
      setCountriesOrig(c);
    });
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
                      checked={countries.indexOf(e.Name) !== -1}
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
          <Button onClick={handleCloseAndSave} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
