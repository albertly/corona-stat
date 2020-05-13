import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

//import { EventsContext, getYesterdayEventsAction } from '../../../shared/context';
import BorderLinearProgress from '../Chart/BorderLinearProgress';
import Cases from './Cases';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      height: 20,
  },
}));

function Yesterday() {
  //const { state, dispatch } = useContext(EventsContext);
  const classes = useStyles();
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

    let response = await axios.get('/yesterday'); 

    setState(response.data);
  };

  fetchData();

    
  //  getYesterdayEventsAction(dispatch);
  }, []);


    return !state.length ? (
      <div className={classes.root}>
        <BorderLinearProgress />
      </div>
    ) : (
      <Cases data={state}></Cases>
    );

}

export default Yesterday;