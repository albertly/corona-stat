import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headCells = [
    { id: 'country', numeric: false, disablePadding: true, label: 'Country' },
    { id: 'total', numeric: false, disablePadding: false, label: 'Total Cases' },
    { id: 'new', numeric: false, disablePadding: false, label: 'New Cases' },
    { id: 'totalDeaths', numeric: false, disablePadding: true, label: 'Total Deaths' },
    { id: 'newDeaths', numeric: false, disablePadding: true, label: 'New Deaths' },
    { id: 'totalRecovered', numeric: false, disablePadding: true, label: 'Total Recovered' },
    { id: 'active', numeric: false, disablePadding: true, label: 'Active' },
    { id: 'serious', numeric: false, disablePadding: true, label: 'Serious' },
    { id: 'totCasesPer1m', numeric: false, disablePadding: true, label: 'Per 1 m' },
  ];


function EnhancedTableHead(props) {

    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              className={`${classes.tableCell} ${classes.cell_short}`}
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
                {/* {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null} */}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  export default EnhancedTableHead;