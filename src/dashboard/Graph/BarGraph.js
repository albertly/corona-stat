import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import './BarGraph.css';

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

export default function BarGraph(props) {
    const { data, mainBarColor } = props;

    return (
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
                            <Cell cursor="pointer" fill={index === data.length - 1 ? '#82ca9d' : mainBarColor } key={`cell-${index}`} />
                        ))
                    }
                </Bar>
            </BarChart >
        </ResponsiveContainer>
    )
}
