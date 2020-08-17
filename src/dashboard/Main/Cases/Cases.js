import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import {
  darken,
  fade,
  lighten,
} from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import { EventsContext, setScrollPos } from '../../../shared/context';
import EnhancedTableHead from './EnhancedTableHead';
import { Flag, numberWithCommas, columns } from '../../../shared/utils';

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
  const stabilizedThis = array
    .reduce(function (result, obj) {
      if (obj.country !== 'Total:') {
        result.push(obj);
      } else {
        total = obj;
      }
      return result;
    }, [])
    .map((el, index) => [el, index]);

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
  return {
    container: {
      [theme.breakpoints.down('xl')]: {
        maxHeight: 628,
      },
      [theme.breakpoints.down('lg')]: {
        maxHeight: 428,
      },
      [theme.breakpoints.down('md')]: {
        maxHeight: 428,
      },
      [theme.breakpoints.down('sm')]: {
        maxHeight: 428,
      },
    },
    total_cell: {
      backgroundColor: 'darkgrey !important',
    },
    cell_short: {
      [theme.breakpoints.down('xl')]: {
        fontSize: '16px',
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: '15px',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '12px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
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
      fontWeight: 'bold',
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
    },
  };
});

const spanStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
};

function Cases({ data }) {
  const { state, dispatch } = useContext(EventsContext);
  const classes = useStyles();
  const theme = useTheme();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('total');

  let columnsFiltered = columns.filter(x =>
    state.columns.some(e => e === x.name)
  );
  //ToDo: Why useEffect doesn't work with state.columns ?
  useEffect(() => {
    let Columns = state.columns;
    columnsFiltered = columns.filter(x => Columns.some(e => e === x.name));
  });

  useEffect(() => {
    const item = document.querySelector('.restore-' + state.scrollPos);
    if (item) {
      item.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'nearest',
      });
      setScrollPos(dispatch, '');
    }
    // return () => {
    //   setScrollPos(dispatch, '');
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    let tempOrder = 'desc';
    if (property === orderBy) {
      tempOrder = order === 'asc' ? 'desc' : 'asc';
    }
    setOrder(tempOrder);
    setOrderBy(property);
  };

  const colorForTotal = index =>
    `${index === 0 ? classes.total_cell : ''} ${classes.cell_short}`;

  const toNumber = v => (v ? +v.replace(/[^\d.\-eE+]/g, '') : -Infinity);

  return (
    <>
      <TableContainer className={`MyScroll ${classes.container}`}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {stableSort(
              data.map(row => {
                let filteredRow = {
                  country: row.country,
                };

                columnsFiltered.forEach(o => {
                  let key = o.id;

                  switch (key) {
                    case 'pop':
                      const popD = toNumber(row.Po);
                      filteredRow['pop'] = popD;
                      filteredRow['popD'] = numberWithCommas(popD.toFixed(0));
                      break;
                    case 'cases1m':
                      const cases1mT = toNumber(row.Po)
                        ? (toNumber(row.active) / toNumber(row.Po)) * 1000000
                        : '';
                      filteredRow['cases1m'] = cases1mT;
                      filteredRow['cases1mD'] = cases1mT
                        ? numberWithCommas(cases1mT.toFixed(2))
                        : '';
                      break;
                    default:
                      filteredRow[key + 'D'] = row[key];
                      filteredRow[key] = toNumber(row[key]);
                  }
                });
                return filteredRow;
              }),
              getComparator(order, orderBy)
            ).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  className={`restore-${row.country}`}
                  hover
                  key={row.country}
                >
                  <TableCell
                    className={`${classes.tableCell} ${
                      classes.freeze
                    } ${colorForTotal(index)} `}
                  >
                    {index}
                  </TableCell>
                  <TableCell
                    style={{ left: '64px' }}
                    className={`${classes.tableCell} ${
                      classes.freeze
                    } ${colorForTotal(index)} `}
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    <Link
                      style={spanStyle}
                      component={RouterLink}
                      to={`graph/${row.country}/${row.new}/${row.newDeaths}/${row.active}`}
                      color="textPrimary"
                    >
                      {Flag(row.country)}
                      {row.country}
                    </Link>
                  </TableCell>

                  {columnsFiltered.map(e => {
                    return (
                      <TableCell
                        key={e.id}
                        style={
                          e.color
                            ? {
                                color: darken(
                                  e.color,
                                  theme.palette.type === 'light' ? 0.2 : 0
                                ),
                              }
                            : {}
                        }
                        className={`${colorForTotal(index)} ${
                          e.color ? classes[e.color] : ''
                        } `}
                      >
                        {row[e.id + 'D']}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default React.memo(Cases);
