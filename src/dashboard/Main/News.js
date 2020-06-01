import React, { useContext  } from 'react';
import { EventsContext } from '../../shared/context';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';


const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

function News({ data }) {
    const { state, dispatch } = useContext(EventsContext);

    return (
        <React.Fragment>
            <Title>News:</Title>
            <marquee direction="down" behavior="scroll" scrollamount="1">
            {state.delta.map((row) => (
                  <Typography key={`${row.country}${row.new}` } variant="subtitle1" gutterBottom>
                            {`${row.country} ${row.new ? row.new : 0} (${row.newOld ? row.newOld : 0})`} 
                  </Typography>
            ))}
            <p></p>
            </marquee>
        </React.Fragment>
    );
}

export default React.memo(News);