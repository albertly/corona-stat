import React, { useContext  } from 'react';
import { EventsContext, getEventsAction } from '../shared/context';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function News({ data }) {
    const { state, dispatch } = useContext(EventsContext);
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>News:</Title>
            <marquee direction="down" behavior="scroll" scrollamount="1">
              
            {state.delta.map((row) => (
                  <Typography component="p" variant="h6">
                            {`${row.country} ${row.new} (${row.newOld})`} 
                  </Typography>
            ))}
            <p></p>
            </marquee>
        </React.Fragment>
    );
}