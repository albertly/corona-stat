import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

import './BarGraph.css';

const today = new Date();
const todayFormated = `${today.getUTCMonthNameShort()} ${today.getUTCDate()}`;

const CustomTooltip = ({ active, payload, label }) => {

    if (active && payload[0]) {
        return (
            <div className="custom-tooltip filter">
                <p className="label pstyle" >{`${label} ${label === todayFormated ? 'Today' : ''}`}</p>
                <p className="label pstyle" >{`Cases : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

export default function BarGraph(props) {
    const { data, mainBarColor, refLine } = props;
    
    let graph = <></>;
    if (data && data.length) {
     
     graph =   <ResponsiveContainer width={'99%'} height={300}>
            <BarChart data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }
                }>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="cases" fill="#8884d8" >
                    {
                        data.map((entry, index) => (
                            <Cell cursor="pointer" fill={index === data.length - 1 ? '#82ca9d' : mainBarColor} key={`cell-${index}`} />
                        ))
                    }
                </Bar>
                {refLine &&
                <ReferenceLine y={data[data.length - 1].cases} label="" stroke="red" />
                }
            </BarChart >
        </ResponsiveContainer>
    }
    return graph;
}
