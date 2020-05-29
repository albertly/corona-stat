import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { EventsContext, setScrollPos } from '../../shared/context';
import Title from '../Title';
import BarChart from './BarGraph';
import { getAlternativeCountryName, Flag } from '../../shared/utils';

//import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';

import {toNumber, todayFormated, InfinityToZero} from '../../shared/utils';

const initial = [
    { id: 'id-1', content: '0' },
    { id: 'id-2', content: '1' },
    { id: 'id-3', content: '2' },
];


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

const spanStyle = { "display": "flex", "alignItems": "center", "justifyContent": "start" };

const DraggableItemList = React.memo(function QuoteList({ items, data, spans, colors, refLine }) {
    return items.map((item, index) => (
        <DraggableItem item={item} index={index} key={item.id}>
            <span style={spanStyle}>
                {spans[item.content]}
            </span>
            <BarChart data={data[item.content]} mainBarColor={colors[item.content]} refLine={refLine[item.content]} />
        </DraggableItem>
    ));
});


export default function DailyCases(props) {
   // const history = useHistory();
    const { state, dispatch } = useContext(EventsContext);
    let { classes, country, _new, death, active } = props;
    const [data, setData] = useState('');
    const [dataDeath, setDataDeath] = useState('');
    const [dataActive, setDataActive] = useState('');
    _new = InfinityToZero(_new);
    death = InfinityToZero(death);
    active = InfinityToZero(active);

    const [state_, setState] = useState({ items: initial });

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const items = reorder(
            state_.items,
            result.source.index,
            result.destination.index
        );
        setState({ items });
    }

    useEffect(() => setScrollPos(dispatch, country), []);

    if (country === 'Total:') country = '';

    const getData = (resultData, cases, f) => {
        const data = [];
        if (resultData.xAxis) {
            resultData.xAxis.categories.forEach((element, index) => {
                data.push(
                    {
                        name: element,
                        cases: resultData.series[0].data[index]
                    }
                );
            });
        }
        data.push({
            name: todayFormated,
            cases});

        f(data);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/graph/${country ? getAlternativeCountryName(country) : ''}`);

            const length = state.events.length;
            const bool = !country && length;

            getData(result.data[0],
                    bool ? +(toNumber(state.events[length - 1].new)) : _new,
                    setData);

            getData(result.data[1],
                    bool ? +(toNumber(state.events[length - 1].newDeaths)) : death,
                    setDataDeath);

            getData(result.data[2],
                    bool ? +(toNumber(state.events[length - 1].active)) : active,
                    setDataActive);
        };

        fetchData();
    }, []);

    const handleBackClick = () => {
     //   history.push('/');
    }

    const spanArray = [
        <>
            <Title>Daily New Cases ({country ? country : 'worldwide'} )</Title>
            {Flag(country, false)}
        </>,
        <Title>Daily New Death</Title>,
        <Title>Active Cases</Title>
    ];

    return  (
        <Container maxWidth="lg" className={classes.container}>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <DraggableItemList items={state_.items}
                                data={[data, dataDeath, dataActive]}
                                spans={spanArray}
                                colors={['#8884d8', 'red', '#8884d8']}
                                refLine={[false, false, true]}
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
