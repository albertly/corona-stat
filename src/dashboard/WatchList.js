import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { countryCodes } from '../shared/CountryCodes';
import { Flag } from '../shared/utils';

//ToDo: what is selectedValue ?
export default function WatchList(props) {
  const { onClose, selectedValue, open } = props;
  const [countries, setCountries] = useState({});

  const handleClose = () => {
    onClose(selectedValue);
  };

  const descriptionElementRef = useRef(null);

  const handleChange = event => {
    const c = {...countries, [event.target.name]: event.target.checked};
    setCountries(c);
    localStorage.setItem('countries', JSON.stringify(c));
  }

  useEffect(() => {
    const countriesStr =  localStorage.getItem('countries');
    if (!countriesStr) {
      const c = {};
      countryCodes.map(e => {
        c[e.Name] = false;
      })
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
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >

            {countryCodes.map((e) => (
              <ListItem button onClick={() => { }} key={e.Name}>

                {Flag(e.Name, false)}

                <ListItemText primary={e.Name} style={{marginLeft:"4px"}}/>

                <Checkbox
                  color="primary"
                  checked={countries[e.Name]}
                  onChange={handleChange}
                  name={e.Name}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </ListItem>
            ))}

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
