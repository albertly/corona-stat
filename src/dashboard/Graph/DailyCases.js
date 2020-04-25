import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { EventsContext } from '../../shared/context';
import Title from '../Title';
import BarChart from './BarGraph';
import { getAlternativeCountryName, Flag } from '../../shared/utils';

import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';

const today = new Date();
const todayFormated = `${today.getUTCMonthNameShort()} ${today.getUTCDate()}`;

const toNumber = v => +(v.replace(/[^\d.\-eE+]/g, ""));


const initial = [
    { id: 'id-1', content: '0' },
    { id: 'id-2', content: '1' },
    { id: 'id-3', content: '2' },
];



const grid = 8;
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
function DraggableItem({ item, index, children }) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {children}

                </div>
            )}
        </Draggable>
    );
}

const DraggableItemList = React.memo(function QuoteList({ items, data, spans, colors }) {
    return items.map((item, index) => (
        <DraggableItem item={item} index={index} key={item.id}>
            {spans[item.content]}
            <BarChart data={data[item.content]} mainBarColor={colors[item.content]} />
        </DraggableItem>
    ));
});


export default function DailyCases(props) {
    const history = useHistory();
    const { stateC, _ } = useContext(EventsContext);
    let { classes, country, _new, death, active } = props;
    const [data, setData] = useState('');
    const [dataDeath, setDataDeath] = useState('');
    const [dataActive, setDataActive] = useState('');


    const [state, setState] = useState({ items: initial });

    function onDragEnd(result) {
        console.log('result', result)
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const items = reorder(
            state.items,
            result.source.index,
            result.destination.index
        );
        console.log('items',items)
        setState({ items });
    }

    if (country === 'Total:') country = '';

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/graph/${country ? getAlternativeCountryName(country) : ''}`);

            const graphData = [];
            if (result.data[0].xAxis) {
                result.data[0].xAxis.categories.forEach((element, index) => {
                    graphData.push(
                        {
                            name: element,
                            cases: result.data[0].series[0].data[index]
                        }
                    );
                });
            }
            graphData.push({
                name: todayFormated,
                cases: !country ? +(toNumber(stateC.new)) : _new
            })
            setData(graphData);

            const graphDataDeath = [];
            if (result.data[1].xAxis) {
                result.data[1].xAxis.categories.forEach((element, index) => {
                    graphDataDeath.push(
                        {
                            name: element,
                            cases: result.data[1].series[0].data[index]
                        }
                    );
                });
            }
            graphDataDeath.push({
                name: todayFormated,
                cases: !country && stateC.events.length ? +(toNumber(stateC.events[stateC.events.length - 1].newDeaths)) : death
            })
            setDataDeath(graphDataDeath);

            const graphDataActive = [];
            if (result.data[2].xAxis) {
                result.data[2].xAxis.categories.forEach((element, index) => {
                    graphDataActive.push(
                        {
                            name: element,
                            cases: result.data[2].series[0].data[index]
                        }
                    );
                });
            }
            graphDataActive.push({
                name: todayFormated,
                cases: !country && stateC.events.length ? +(toNumber(stateC.events[stateC.events.length - 1].active)) : active
            })
            setDataActive(graphDataActive);
        };
        fetchData();
    }, []);

    const handleBackClick = () => {
        history.push('/');
    }

    const spanStyle = { "display": "flex", "alignItems": "center", "justifyContent": "start" };

    const t1 = (
        <span style={spanStyle}>
            <Title>Daily New Cases ({country ? country : 'worldwide'} )</Title>
            {Flag(country, false)}
        </span>
    );
    const t2 = (
        <span style={spanStyle}>
            <Title>Daily New Death</Title>
        </span>
    );
    const t3 = (
        <span style={spanStyle}>
        <Title>Active Cases</Title>
    </span>
    )
    
    return data && dataDeath && (
        <Container maxWidth="lg" className={classes.container}>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <DraggableItemList items={state.items}  
                                               data={[data, dataDeath, dataActive]}
                                               spans={[t1, t2, t3]}
                                               colors={['#8884d8', 'red', '#8884d8']}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <Zoom in={true}>
                <div onClick={handleBackClick} role="presentation" className={classes.rootZoom} >
                    <Fab color="primary" size="small" aria-label="go back">
                        <Tooltip title="Go back"><ArrowBackIcon /></Tooltip>
                    </Fab>
                </div>
            </Zoom>

        </Container >
    )
}
