import React, { useState, useEffect  } from 'react';
import axios from 'axios';

import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';


export default function Chart({refreshGraph, onRefreshGraph}) {
  const theme = useTheme();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const result = await axios.get(`prob/${today.getFullYear()+'-'+(today.getMonth()+1).pad()+'-'+today.getUTCDate()}`);
      const graphData = result.data.map(e => (
          { 
            time: e.probeTime,
            amount: parseInt(e.newCases.replace(/[^\d\.\-eE+]/g, ""))
          }
        )
      )
      onRefreshGraph();
      console.log('graphData', graphData);
      setData(graphData);
    };
    if (refreshGraph) 
    {
      fetchData();
    }
  }, [refreshGraph]);

  return (       
    <React.Fragment>      
      <Title>{  new Date().toUTCString() } </Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Cases
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
