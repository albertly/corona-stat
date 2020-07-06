import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Title from './Title';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  container: {
    maxHeight: 440,
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
              <TableCell>Country</TableCell>
              <TableCell>Total Cases</TableCell>
              <TableCell>New Cases</TableCell>
              <TableCell>Total Deaths</TableCell>
              <TableCell>New Deaths</TableCell>
              <TableCell align="right">Total Recovered</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Serious</TableCell>
              <TableCell>Total Per 1 m</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.country}>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.new}</TableCell>
                <TableCell>{row.totalDeaths}</TableCell>
                <TableCell>{row.newDeaths}</TableCell>
                <TableCell align="right">{row.totalRecovered}</TableCell>
                <TableCell>{row.active}</TableCell>
                <TableCell>{row.serious}</TableCell>
                <TableCell>{row.totCasesPer1m}</TableCell>
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
