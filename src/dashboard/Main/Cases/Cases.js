import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import EnhancedTableHead from './EnhancedTableHead';

import { Flag } from '../../../shared/utils';

import Title from '../../Title';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  let total;
  const stabilizedThis = array.reduce(function (result, o) {
    if (o.country !== 'Total:') {
      result.push(o);
    }
    else {
      total = o;
    }
    return result;
  }, []).map((el, index) => [el, index]);

  //const stabilizedThis = array.filter(el => el.country !== 'Total:').map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (total) {
    stabilizedThis.unshift([total, 0]);
  }

  return stabilizedThis.map((el) => el[0]);

}

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  total_cell: {
    backgroundColor: 'grey',
  },
  cell_short: {
    [theme.breakpoints.down("xl")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      width: 20,
    },
  },
  tableCell: {
    width: 70,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
  }
}));

export default function Cases({ data }) {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('total');
  const [selected, setSelected] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const colorForTotal = index => `${index === 0 ? classes.total_cell : {}} ${classes.cell_short}`;


  return (
    <React.Fragment>
      {/* <Title>Confirmed Cases</Title> */}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {
              stableSort(data.map(row => {
                return {
                  country: row.country,
                  totalD: row.total,
                  newD: row.new,
                  totalDeathsD: row.totalDeaths,
                  newDeathsD: row.newDeaths,
                  totalRecoveredD: row.totalRecovered,
                  activeD: row.active,
                  seriousD: row.serious,
                  totCasesPer1mD: row.totCasesPer1m,
                  total: +(row.total.replace(/[^\d.\-eE+]/g, "")),
                  new: +(row.new.replace(/[^\d.\-eE+]/g, "")),
                  totalDeaths: +(row.totalDeaths.replace(/[^\d.\-eE+]/g, "")),
                  newDeaths: +(row.newDeaths.replace(/[^\d.\-eE+]/g, "")),
                  totalRecovered: +(row.totalRecovered.replace(/[^\d.\-eE+]/g, "")),
                  active: +(row.active.replace(/[^\d.\-eE+]/g, "")),
                  serious: +(row.serious.replace(/[^\d.\-eE+]/g, "")),
                  totCasesPer1m: +(row.totCasesPer1m.replace(/[^\d.\-eE+]/g, "")),
                }
              }),
                getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow key={row.country}>
                      <TableCell className={`${classes.tableCell} ${colorForTotal(index)}`} component="th" id={labelId} scope="row" padding="none">

                        <Link component={RouterLink} to={`graph/${row.country}/${row.new}/${row.newDeaths}`} color='textPrimary'>
                          <span style={{ "display": "flex", "alignItems": "center", "justifyContent": "start" }}>
                            {Flag(row.country)}
                            {row.country}
                          </span>
                        </Link>
                      </TableCell>

                      <TableCell className={colorForTotal(index)}>{row.totalD}</TableCell>
                      <TableCell className={colorForTotal(index)}>{row.newD}</TableCell>
                      <TableCell className={colorForTotal(index)}>{row.totalDeathsD}</TableCell>
                      <TableCell className={colorForTotal(index)}>{row.newDeathsD}</TableCell>
                      <TableCell className={colorForTotal(index)}>{row.totalRecoveredD}</TableCell>
                      <TableCell className={colorForTotal(index)}>{row.activeD}</TableCell>
                      <TableCell className={colorForTotal(index)}>{row.seriousD}</TableCell>
                      <TableCell className={colorForTotal(index)}>{row.totCasesPer1mD}</TableCell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
