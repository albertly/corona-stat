import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

import Chart from './Chart/Chart';
import Totals from './Totals';
import Today from './Cases/Today';
import Yesterday from './Cases/yesterday';
import News from './News';
import Copyright from './Copyright';
import TabPanel from './TabPanel';

function Main(props) {
  const { classes, refreshGraph } = props;

  const [value, setValue] = React.useState(0);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={1}>
        {/* Totals */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Totals />
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={6}>
          <Paper className={fixedHeightPaper}>
            <Chart refreshGraph={refreshGraph} />
          </Paper>
        </Grid>
        {/* News */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <News />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            classes={{
              root: classes.rootTabs, // class name, e.g. `classes-nesting-root-x`
            }}
          >
            <Tab
              size="small"
              label="Now"
              classes={{
                root: classes.rootTab, // class name, e.g. `classes-nesting-root-x`
              }}
            />
            <Tab
              size="small"
              label="Yesterday"
              classes={{
                root: classes.rootTab, // class name, e.g. `classes-nesting-root-x`
              }}
            />
          </Tabs>
          <SwipeableViews
            index={value}
            animateTransitions={false}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0}>
              <Today />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Yesterday />
            </TabPanel>
          </SwipeableViews>
          {/* </Paper> */}
        </Grid>
      </Grid>
      <Box pt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default React.memo(Main);
