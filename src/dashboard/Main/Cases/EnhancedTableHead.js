import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headCells = [
    { id: 'country', numeric: false, disablePadding: true, label: 'Country' },
    { id: 'total', numeric: false, disablePadding: false, label: 'Cases' },
    { id: 'new', numeric: false, disablePadding: false, label: 'New Cases' },
    { id: 'totalDeaths', numeric: false, disablePadding: true, label: 'Deaths' },
    { id: 'newDeaths', numeric: false, disablePadding: true, label: 'New Deaths' },
    { id: 'totalRecovered', numeric: false, disablePadding: true, label: 'Recovered' },
    { id: 'active', numeric: false, disablePadding: true, label: 'Active' },
    { id: 'serious', numeric: false, disablePadding: true, label: 'Serious' },
    { id: 'totCasesPer1m', numeric: false, disablePadding: true, label: 'Cases / 1 m' },
    { id: 'dPer1m', numeric: false, disablePadding: true, label: 'Death / 1 m' },
    { id: 'tPer1m', numeric: false, disablePadding: true, label: 'Tests / 1 m' },
    { id: 'pop', numeric: false, disablePadding: true, label: 'Population' },
  ];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell, i) => (
            <TableCell
              key={headCell.id}
              className={`${classes.tableCell} ${classes.cell_short} ${ i === 0 ? classes.freeze : ''} ${ i === 0 ? classes.deepFreeze : ''} `}
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