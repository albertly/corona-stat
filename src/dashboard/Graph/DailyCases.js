import React, { useState, useEffect, useContext } from 'react';
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


export default function DailyCases(props) {
    const history = useHistory();
    const { state, _ } = useContext(EventsContext);
    let { classes, country, _new, death } = props;
    const [data, setData] = useState('');
    const [dataDeath, setDataDeath] = useState('');
    const [dataActive, setDataActive] = useState('');
    
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
                cases: !country ? +(state.new.replace(/[^\d\.\-eE+]/g, "")) : _new
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
                cases: !country ? 0 : death
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
            graphDataDeath.push({
                name: todayFormated,
                cases: 0
            })
            console.log('graphDataActive', graphDataActive)
            setDataActive(graphDataActive);
        };
        fetchData();
    }, []);

    const handleBackClick = () => {
        history.push('/');
    }

    const spanStyle = { "display": "flex", "alignItems": "center", "justifyContent": "start" };

    return data && dataDeath && (
        <Container maxWidth="lg" className={classes.container}>
            <span style={spanStyle}>
                <Title>Daily New Cases ({country ? country : 'worldwide'} )</Title>
                {Flag(country, false)}
            </span>

            <BarChart data={data} mainBarColor={'#8884d8'} />


            <span style={spanStyle}>
                <Title>Daily New Death</Title>
            </span>

            <BarChart data={dataDeath} mainBarColor={'red'} />

            <span style={spanStyle}>
                <Title>Active Cases</Title>
            </span>

            <BarChart data={dataActive} mainBarColor={'#8884d8'} />

            <Zoom in={true}>
                <div  onClick={handleBackClick} role="presentation" className={classes.rootZoom} >
                    <Fab color="primary" size="small" aria-label="go back">
                    <Tooltip title="Go back"><ArrowBackIcon /></Tooltip>
                    </Fab>
                </div>
            </Zoom>

        </Container>
    )
}
