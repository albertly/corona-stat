import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { EventsContext } from '../../shared/context';
import Title from '../Title';
import '../../shared/utils';

const today = new Date();
const todayFormated = `${today.getUTCMonthNameShort()} ${today.getUTCDate()}`;

const CustomTooltip = ({ active, payload, label }) => {
    const pstyle = {
       margin: '0px',
       padding: '1px',
       color: 'red',
       fontWeight: 'bold',
       fontSize: 'medium'
    };
    if (active && payload[0]) {
      return (
        <div className="custom-tooltip">
          <p className="label" style={pstyle}>{`${label} ${label === todayFormated ? 'Today': ''}`}</p>
          <p className="label" style={pstyle}>{`Cases : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

export default function DailyCases(props) {
    const { state, _ } = useContext(EventsContext);
    let { classes, country, _new } = props;
    const [data, setData] = useState('');

    if (country === 'Total:') country = '';

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/graph/${country ? country : ''}`);
            const graphData = [];
            if (result.data.xAxis) {
                result.data.xAxis.categories.forEach((element, index) => {
                    graphData.push(
                        {
                            name: element,
                            cases: result.data.series[0].data[index]
                        }
                    );
                });
            }

            graphData.push({
                name: todayFormated,
                cases: !country ? +(state.new.replace(/[^\d\.\-eE+]/g, "")) : _new
            })

            setData(graphData);
        };
        fetchData();
    }, []);

    return data ? (
        <Container maxWidth="lg" className={classes.container}>
            <Title>Daily New Cases ({country ? country : 'worldwide'})</Title>
            <ResponsiveContainer width={'99%'} height={300}>
                <BarChart data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }
                    }>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip itemStyle={{ color: 'red' }} contentStyle={{ color: 'red' }} content={<CustomTooltip/>} />
                    <Bar dataKey="cases" fill="#8884d8" >
                        {
                            data.map((entry, index) => (
                                <Cell cursor="pointer" fill={index === data.length-1 ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
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
