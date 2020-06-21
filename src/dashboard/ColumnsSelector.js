import React, { useEffect, useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';


import TransferList from './TransferList';
import { EventsContext, setColumns } from '../shared/context';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}


const Columns = [
  "Total Cases",
  "New Cases",
  "Total Deaths",
  "New Deaths",
  "Total Recovered",
  "New Recovered",
  "Active",
  "Serious",
  "Total Cases per 1 m.",
  "Total Death per 1 m.",
  "Total Tests per 1 m.",
  "Population",
  "Active Cases per 1 m.",
  "1 case per X ppl",
  "1 death per X ppl",
  "1 test per X ppl"
]

export default function ColumnsSelector(props) {
  const { onClose, selectedValue, open } = props;
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const { state, dispatch } = useContext(EventsContext);

  const handleClose = () => {
    setColumns(dispatch, right);
    onClose(selectedValue);
  };

  const descriptionElementRef = useRef(null);
  //ToDo : Make Save & Close and Cancel
  const handleChange = event => {

  }

  useEffect(() => {
    const columnsStr = localStorage.getItem('columns');
    let rightArr = state.columns;
    setRight(rightArr);

    setLeft(not(Columns, rightArr));

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
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Choose Columns</DialogTitle>
        <DialogContent dividers={true}>

            <TransferList left={left} setLeft={setLeft} right={right} setRight={setRight}/>
 
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
