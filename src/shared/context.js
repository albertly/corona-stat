import React, { useReducer } from 'react';
import axios from 'axios';

const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

// const GET_STAT_SUCCESS = 'GET_STAT_SUCCESS';
// const GET_STAT_FAILURE = 'GET_STAT_FAILURE';


const EventsContext = React.createContext();


const initialState = { events: [], delta: [], total: '', new: '', currentEvent: {}, errorMessage: '' };

function compareArr(new_, old_) {
    const res = [];
    let total = "", newTotal = "";

    if (old_ == undefined || old_.length == 0) {
        return { res: new_,
                 new: newTotal,
                 total}
         ;
    }

    new_.forEach(obj => {
        const oldObj = old_.find(e => obj.country == e.country);
        if (oldObj && oldObj.new != obj.new) {
            if (obj.country == 'Total:') {
                total = obj.total;
                newTotal = obj.new;
            }
            else {
                res.push({ ...obj, newOld: oldObj.new });
            }
            //console.log('!!!-', obj.country, `${obj.new}(${oldObj.new})`);            
        }
    });

    return { res,
             new: newTotal, 
             total};
}

//ToDo: getEventsAction should mark start action and not allow to run axios when marked.
//      It should run 
const reducer = (state, action) => {

    switch (action.type) {
        case GET_EVENTS_SUCCESS:

            const { res: delta, newTotal, total } = compareArr(action.payload, state.events);
            
            if (delta.length) {
                   
                return { ...state,
                         events: action.payload,
                         delta:  [...delta, ...state.delta].slice(0, 10),
                         total:  action.payload[action.payload.length - 1].total, //total ? total : state.total,
                         new:    action.payload[action.payload.length - 1].new ,  //newTotal ? newTotal : state.new,
                        errorMessage: '' };
            }

        case GET_EVENTS_FAILURE:
            return { ...state, currentEvent: {}, errorMessage: action.error }
        
        
        default:
            return state;
    }

    return state;
};


const getEventsAction = async (dispatch) => {
    let response = {};
    try {
        response = await axios.get('');
        //console.log('response', response);
        dispatch({ type: GET_EVENTS_SUCCESS, payload: response.data });
    }
    catch (ex) {
        dispatch({ type: GET_EVENTS_FAILURE, error: 'Get Events Error' });
    }
}

function ContextEventsProvider(props) {
    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };

    return (
        <EventsContext.Provider value={value}>{props.children}</EventsContext.Provider>
    );
}


export {
    EventsContext,
    ContextEventsProvider,
    getEventsAction
};