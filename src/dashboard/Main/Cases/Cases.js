import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import { EventsContext, setScrollPos } from '../../../shared/context';
import EnhancedTableHead from './EnhancedTableHead';
import { Flag } from '../../../shared/utils';


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
  const stabilizedThis = array.reduce(function (result, obj) {
    if (obj.country !== 'Total:') {
      result.push(obj);
    }
    else {
      total = obj;
    }
    return result;
  }, []).map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (total) {
    stabilizedThis.unshift([total, 0]);
  }

  return stabilizedThis.map(el => el[0]);

}

const useStyles = makeStyles(theme => {
  console.log('theme', theme)
  return ({
  container: {    
    [theme.breakpoints.down("xl")]: {
      maxHeight: 628,
    },
    [theme.breakpoints.down("lg")]: {
      maxHeight: 428,
    },
    [theme.breakpoints.down("md")]: {
      maxHeight: 428,
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: 428,      
    },
  },
  total_cell: {
    backgroundColor: 'grey !important',
  },
  cell_short: {
    [theme.breakpoints.down("xl")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
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
  },
  limeCell: {
    color: '#e65100',
    fontWeight: 'bold',
  },
  redCell: {
    color: 'red',
    fontWeight: 'bold'
  },
  freeze: {
    position: 'sticky',
    left: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: 2,
    ...theme.typography.body2,
    display: 'table-cell',
    verticalAlign: 'inherit',
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: `1px solid
    ${
      theme.palette.type === 'light'
        ? lighten(fade(theme.palette.divider, 1), 0.88)
        : darken(fade(theme.palette.divider, 1), 0.68)
    }`,
    textAlign: 'left',
    //padding: 16,
  },
  deepFreeze: {
    zIndex: 5,
  }
  
})});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const spanStyle = { "display": "flex", "alignItems": "center", "justifyContent": "start" };

export default function Cases({ data }) {
  const { state, dispatch } = useContext(EventsContext);
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('total');

  useEffect(() => {
    console.log('mount');
    const item = document.querySelector('.restore-' + state.scrollPos);
    if (item) {
      item.scrollIntoView({behavior: 'auto', block: 'center', inline: 'nearest'});
      setScrollPos(dispatch, '');
    }
    // return () => {
    //   setScrollPos(dispatch, '');
    // };
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const colorForTotal = index => `${index === 0 ? classes.total_cell : ''} ${classes.cell_short}`;

  const toNumber = v => v ? +(v.replace(/[^\d.\-eE+]/g, "")) : Infinity;
  
  return (
    <>
    {/* <button onClick={() => document.querySelector('.MyScroll').scrollTop = 1000}>Set Scroll</button> 
    onScroll={(e)=>console.log('s1 ', e.target.scrollTop)} */}
    <TableContainer className={`MyScroll ${classes.container}`}>
      <Table stickyHeader aria-label="sticky table" size="small">
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
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
                total: toNumber(row.total),
                new: toNumber(row.new),
                totalDeaths: toNumber(row.totalDeaths),
                newDeaths: toNumber(row.newDeaths),
                totalRecovered: toNumber(row.totalRecovered),
                active: toNumber(row.active),
                serious: toNumber(row.serious),
                totCasesPer1m: toNumber(row.totCasesPer1m.trim()),
                dPer1mD: row.dPer1m,
                tPer1mD: row.tPer1m,
                dPer1m: toNumber(row.dPer1m),
                tPer1m: toNumber(row.tPer1m),
                pop : toNumber(row.total) / toNumber(row.totCasesPer1m) * 1000000,
              }
            }),
              getComparator(order, orderBy))
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow className={`restore-${row.country}`} hover key={row.country}>
                    <TableCell className={`${classes.tableCell} ${classes.freeze} ${colorForTotal(index)} `} component="th" id={labelId} scope="row" padding="none">
                      <Link  style={spanStyle} component={RouterLink} to={`graph/${row.country}/${row.new}/${row.newDeaths}/${row.active}`} color='textPrimary'>
                        {Flag(row.country)}
                        {row.country}
                      </Link>
                    </TableCell>
                    <TableCell className={colorForTotal(index)}>{row.totalD}</TableCell>
                    <TableCell className={`${colorForTotal(index)} ${classes.limeCell}`}>{row.newD}</TableCell>
                    <TableCell className={colorForTotal(index)}>{row.totalDeathsD}</TableCell>
                    <TableCell className={`${colorForTotal(index)} ${classes.redCell}`}>{row.newDeathsD}</TableCell>
                    <TableCell className={colorForTotal(index)}>{row.totalRecoveredD}</TableCell>
                    <TableCell className={colorForTotal(index)}>{row.activeD}</TableCell>
                    <TableCell className={colorForTotal(index)}>{row.seriousD}</TableCell>
                    <TableCell className={colorForTotal(index)}>{row.totCasesPer1mD}</TableCell>
                    <TableCell className={colorForTotal(index)}>{row.dPer1mD}</TableCell>
                    <TableCell className={colorForTotal(index)}>{row.tPer1mD}</TableCell>
                    <TableCell className={colorForTotal(index)}>{numberWithCommas(row.pop.toFixed(0)) }</TableCell>
                  </TableRow>
                )
              })}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
