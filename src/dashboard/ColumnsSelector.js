import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';


import TransferList from './TransferList';

const Columns = [
    { name: "Country", id: "countr"},
    { name: "Total Cases", id: "total"},
    { name: "New Cases", id: "new"},
    { name: "Total Deaths", id: "totalDeaths"},
    { name: "New Deaths", id:"newDeaths"},
    { name: "Total Recovered", id:"totalRecovered"},
    { name: "New Recovered", id:"newRecovered"},
    { name: "Active", id: "active"},
    { name: "Serious", id:"serious"},
    { name: "Total Cases per 1 m.", id:"totCasesPer1m"},
    { name: "Total Death per 1 m.", id:"dPer1m"},
    { name: "Total Tests per 1 m.", id:"tPer1m"},
    { name: "Population", id:"Po"},
    { name: "Active Cases per 1 m.", id: "cases1m"},
    { name: "1 case per X ppl", id: "1CperXppl"},
    { name: "1 death per X ppl", id: "1DperXppl"},
    { name: "1 test per X ppl", id:"1TperXppl"},

]

export default function ColumnsSelector(props) {
  const { onClose, selectedValue, open } = props;


  const handleClose = () => {
    onClose(selectedValue);
  };

  const descriptionElementRef = useRef(null);

  const handleChange = event => {

  }

  useEffect(() => {


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
        <DialogTitle id="scroll-dialog-title">Choose Columns</DialogTitle>
        <DialogContent dividers={true}>

            <TransferList list={[...Columns]}/>
 
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
