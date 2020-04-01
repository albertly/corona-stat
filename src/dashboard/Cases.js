import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import EnhancedTableHead from '../shared/EnhancedTableHead';

import Title from './Title';

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
  console.log('sorting', order, orderBy);
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  console.log('In stableSort',);
  let total; 
  const stabilizedThis = array.reduce(function(result, o) {
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
    backgroundColor: theme.palette.primary.light,
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
  const colorForTotal = index => `${ index === 0 ? classes.total_cell : {}} ${classes.cell_short}`;

  return (
    <React.Fragment>
      <Title>Confirmed Cases by Country</Title>
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
             stableSort( data.map(row => {
              return {                
                country: row.country,
                total: +(row.total.replace(/[^\d\.\-eE+]/g, "")),
                new: +(row.new.replace(/[^\d\.\-eE+]/g, "")),
                totalDeaths: +(row.totalDeaths.replace(/[^\d\.\-eE+]/g, "")),
                newDeaths: +(row.newDeaths.replace(/[^\d\.\-eE+]/g, "")),
                totalRecovered: +(row.totalRecovered.replace(/[^\d\.\-eE+]/g, "")),
                active: +(row.active.replace(/[^\d\.\-eE+]/g, "")),
                serious: +(row.serious.replace(/[^\d\.\-eE+]/g, "")),
                totCasesPer1m: +(row.totCasesPer1m.replace(/[^\d\.\-eE+]/g, ""))
              }
            }),
             getComparator(order, orderBy))
              .map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
              <TableRow key={row.country}>
                <TableCell className={`${classes.tableCell} ${colorForTotal(index)}`} component="th" id={labelId} scope="row" padding="none">
                        {row.country}
                </TableCell>
                
                <TableCell className={colorForTotal(index)}>{row.total}</TableCell>
                <TableCell className={colorForTotal(index)}>{row.new}</TableCell>
                <TableCell className={colorForTotal(index)}>{row.totalDeaths}</TableCell>
                <TableCell className={colorForTotal(index)}>{row.newDeaths}</TableCell>
                <TableCell className={colorForTotal(index)}>{row.totalRecovered}</TableCell>
                <TableCell className={colorForTotal(index)}>{row.active}</TableCell>
                <TableCell className={colorForTotal(index)}>{row.serious}</TableCell>
                <TableCell className={colorForTotal(index)}>{row.totCasesPer1m}</TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
