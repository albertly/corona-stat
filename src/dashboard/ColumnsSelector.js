import React, { useEffect, useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

import TransferList from './TransferList';
import { EventsContext, setColumns } from '../shared/context';
import { not, columns } from '../shared/utils';

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

  useEffect(() => {
    let rightArr = state.columns;
    setRight(rightArr);

    setLeft(
      not(
        columns.map(e => e.name),
        rightArr
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <TransferList
            left={left}
            setLeft={setLeft}
            right={right}
            setRight={setRight}
          />
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
