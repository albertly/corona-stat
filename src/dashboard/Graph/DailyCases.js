import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Title from '../Title';

export default function DailyCases() {
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
                        data: result.data.series[0].data[index]
                    }
                );
            });

            setData(graphData);
        };
        fetchData();
    }, []);

    return data ? (
        <React.Fragment>
            <Title>Daily New Cases (worldwide)</Title>
            <ResponsiveContainer width={'99%'} height={300}>
                <BarChart data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }
                    }>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="data" fill="#8884d8" />
                </BarChart >
            </ResponsiveContainer>

        </React.Fragment>
    ) : (
            <>
            </>
        );
}
