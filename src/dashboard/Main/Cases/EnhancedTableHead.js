import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { EventsContext } from '../../../shared/context';

const headCells = [
  { id: 'no', numeric: true, disablePadding: true, label: '#', id1: "No" },
  { id: 'country', numeric: false, disablePadding: true, label: 'Country', id1: "Country" },
  { id: 'total', numeric: false, disablePadding: false, label: 'Cases', id1: "Total Cases" },
  { id: 'new', numeric: false, disablePadding: false, label: 'New Cases', id1: "New Cases" },
  { id: 'totalDeaths', numeric: false, disablePadding: true, label: 'Deaths', id1: "Total Deaths" },
  { id: 'newDeaths', numeric: false, disablePadding: true, label: 'New Deaths', id1: "New Deaths" },
  { id: 'totalRecovered', numeric: false, disablePadding: true, label: 'Recovered', id1: "Total Recovered" },
  { id: 'newRecovered', numeric: false, disablePadding: true, label: 'New Recovered', id1: "New Recovered" },
  { id: 'active', numeric: false, disablePadding: true, label: 'Active', id1: "Active" },
  { id: 'serious', numeric: false, disablePadding: true, label: 'Serious', id1: "Serious" },
  { id: 'totCasesPer1m', numeric: false, disablePadding: true, label: 'Cases / 1 m', id1: "Total Cases per 1 m." },
  { id: 'dPer1m', numeric: false, disablePadding: true, label: 'Death / 1 m', id1: "Total Death per 1 m." },
  { id: 'tPer1m', numeric: false, disablePadding: true, label: 'Tests / 1 m', id1: "Total Tests per 1 m." },
  { id: 'pop', numeric: false, disablePadding: true, label: 'Population', id1: "Population" },
  { id: 'cases1m', numeric: false, disablePadding: true, label: 'Cases / 1m', id1: "Active Cases per 1 m." },
  { id: '1CperXppl', numeric: false, disablePadding: true, label: 'Case / X ppl', id1: "1 case per X ppl" },
  { id: '1DperXppl', numeric: false, disablePadding: true, label: 'Death / X ppl', id1: "1 death per X ppl" },
  { id: '1TperXppl', numeric: false, disablePadding: true, label: 'Test / X ppl', id1: "1 test per X ppl" },
];


const ColumnsAll = [
  "No", 
  "Country", 
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
  "1 test per X ppl", 
]

function EnhancedTableHead(props) {
  const { state, dispatch } = useContext(EventsContext);
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  
  const Columns = [ColumnsAll[0], ColumnsAll[1],  ...state.columns];

  const headCellsFiltered = headCells.filter(x => Columns.some(e => e === x.id1));
  
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