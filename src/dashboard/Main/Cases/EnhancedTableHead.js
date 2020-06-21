import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { EventsContext } from '../../../shared/context';
import {headCells} from  '../../../shared/utils';


function EnhancedTableHead(props) {
  const { state, dispatch } = useContext(EventsContext);
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  
  const columns = ["No", "Country",  ...state.columns];

  const headCellsFiltered = headCells.filter(x => columns.some(e => e === x.name));
  
  console.log('headCellsFiltered', headCellsFiltered);
  return (
    <TableHead>
      <TableRow>
        {headCellsFiltered.map((headCell, i) => (
          <TableCell
            key={headCell.id}
            className={`${classes.tableCell} ${classes.cell_short} ${i === 0 ? classes.freeze : ''} ${i === 0 ? classes.deepFreeze : ''} `}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >

              {headCell.label}

            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;