import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  container: {
    maxHeight: 440,
  },
  cell_long: {
    fontSize: "10px",
    width: 600,
    minWidth: 1,
    backgroundColor: '#ee82ee'

  },
  cell_short: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
      width: 20,
    },    
  },
}));

export default function Cases({ data }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Confirmed Cases by Country</Title>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell_short}>Country</TableCell>
              <TableCell className={classes.cell_short}>Total Cases</TableCell>
              <TableCell className={classes.cell_short}>New Cases</TableCell>
              <TableCell className={classes.cell_short}>Total Deaths</TableCell>
              <TableCell className={classes.cell_short}>New Deaths</TableCell>
              <TableCell className={classes.cell_short}>Total Recovered</TableCell>
              <TableCell className={classes.cell_short}>Active</TableCell>
              <TableCell className={classes.cell_short}>Serious</TableCell>
              <TableCell className={classes.cell_short}>Per 1 m</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.country}>
                <TableCell className={classes.cell_short}>{row.country}</TableCell>
                <TableCell className={classes.cell_short}>{row.total}</TableCell>
                <TableCell className={classes.cell_short}>{row.new}</TableCell>
                <TableCell className={classes.cell_short}>{row.totalDeaths}</TableCell>
                <TableCell className={classes.cell_short}>{row.newDeaths}</TableCell>
                <TableCell className={classes.cell_short}>{row.totalRecovered}</TableCell>
                <TableCell className={classes.cell_short}>{row.active}</TableCell>
                <TableCell className={classes.cell_short}>{row.serious}</TableCell>
                <TableCell className={classes.cell_short}>{row.totCasesPer1m}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}
