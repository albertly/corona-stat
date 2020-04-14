import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { EventsContext } from '../../shared/context';
import Title from '../Title';
import { getAlternativeCountryName, Flag } from '../../shared/utils';
import './DailyCases.css';

const today = new Date();
const todayFormated = `${today.getUTCMonthNameShort()} ${today.getUTCDate()}`;

const CustomTooltip = ({ active, payload, label }) => {
    const pstyle = {
        margin: '0px',
        padding: '2px',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 'medium'
    };


    if (active && payload[0]) {
        return (
            <div className="custom-tooltip filter">
                <p className="label" style={pstyle}>{`${label} ${label === todayFormated ? 'Today' : ''}`}</p>
                <p className="label" style={pstyle}>{`Cases : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

export default function DailyCases(props) {
    const { state, _ } = useContext(EventsContext);
    let { classes, country, _new, death } = props;
    const [data, setData] = useState('');
    const [dataDeath, setDataDeath] = useState('');

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

        };
        fetchData();
    }, []);

    return data ? (
        <Container maxWidth="lg" className={classes.container}>
            <span style={{ "display": "flex", "alignItems": "center", "justifyContent": "start" }}>
                <Title>Daily New Cases ({country ? country : 'worldwide'} )</Title>
                {Flag(country, false)}
            </span>

            <ResponsiveContainer width={'99%'} height={300}>
                <BarChart data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }
                    }>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip itemStyle={{ color: 'red' }} contentStyle={{ color: 'red' }} content={<CustomTooltip />} />
                    <Bar dataKey="cases" fill="#8884d8" >
                        {
                            data.map((entry, index) => (
                                <Cell cursor="pointer" fill={index === data.length - 1 ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                            ))
                        }
                    </Bar>
                </BarChart >
            </ResponsiveContainer>


            <span style={{ "display": "flex", "alignItems": "center", "justifyContent": "start" }}>
                <Title>Daily New Death</Title>
            </span>

            <ResponsiveContainer width={'99%'} height={300}>
                <BarChart data={dataDeath}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }
                    }>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip itemStyle={{ color: 'red' }} contentStyle={{ color: 'red' }} content={<CustomTooltip />} />
                    <Bar dataKey="cases" fill="#8884d8" >
                        {
                            data.map((entry, index) => (
                                <Cell cursor="pointer" fill={index === data.length - 1 ? '#82ca9d' : 'red'} key={`cell-${index}`} />
                            ))
                        }
                    </Bar>
                </BarChart >
            </ResponsiveContainer>
            
        </Container>
    ) : (
            <>
            </>
        );
}
