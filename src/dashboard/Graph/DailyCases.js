import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { EventsContext } from '../../shared/context';
import Title from '../Title';
import   '../../shared/utils';

export default function DailyCases(props) {
    const { state, _ } = useContext(EventsContext);
    const { classes } = props;
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/graph');
            console.log('result', result);
            const graphData = [];
            result.data.xAxis.categories.forEach((element, index) => {
                graphData.push(
                    {
                        name: element,
                        cases: result.data.series[0].data[index]
                    }
                );
            });
            const today = new Date();
            graphData.push ({
               name: `${today.getUTCMonthNameShort()} ${today.getUTCDate()}`,
               cases: +(state.new.replace(/[^\d\.\-eE+]/g, "")) 
            })
            setData(graphData);
        };
        fetchData();
    }, []);

    return data ? (
        <React.Fragment>
             <Container maxWidth="lg" className={classes.container}>
            <Title>Daily New Cases (worldwide)</Title>
            <ResponsiveContainer width={'99%'} height={300}>
                <BarChart data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }
                    }>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip itemStyle={{color:'red'}} contentStyle={{color:'red'}} />
                    <Bar dataKey="cases" fill="#8884d8" />
                </BarChart >
            </ResponsiveContainer>
            </Container>
        </React.Fragment>
    ) : (
            <>
            </>
        );
}
