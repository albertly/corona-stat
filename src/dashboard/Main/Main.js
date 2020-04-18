import React, { useState } from 'react';
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
import Counter from './Chart/Today';
import Yesterday from './Chart/yesterday';
import News from './News';
import Copyright from './Copyright';
import TabPanel from './TabPanel';

export default function Main(props) {
    const { classes, refreshGraph, handleRefreshGraph } = props;

    const [value, setValue] = React.useState(0);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
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
                        <Chart refreshGraph={refreshGraph} onRefreshGraph={handleRefreshGraph} />
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
                    {/* <Paper className={classes.paper1}> */}
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
                        <Tab size="small" label="Now" 
                            classes={{
                                root: classes.rootTab, // class name, e.g. `classes-nesting-root-x`
                                label: classes.labelTab, // class name, e.g. `classes-nesting-label-x`
                            }}
                        />
                        <Tab size="small" label="Yesterday" 
                            classes={{
                                root: classes.rootTab, // class name, e.g. `classes-nesting-root-x`
                                label: classes.labelTab, // class name, e.g. `classes-nesting-label-x`
                            }}
                        />
                    </Tabs>
                    <SwipeableViews
                        index={value}
                        animateTransitions={false}
                        onChangeIndex={handleChangeIndex}>
                        <TabPanel value={value} index={0}>
                            <Counter />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Yesterday />
                        </TabPanel>
                    </SwipeableViews>
                    {/* </Paper> */}
                </Grid>
            </Grid>
            <Box pt={4}>
                <Copyright />
            </Box>
        </Container>
    );
}