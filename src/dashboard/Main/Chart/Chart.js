import React, { useState, useEffect  } from 'react';
import axios from 'axios';

import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from '../../Title';


export default function Chart({refreshGraph, onRefreshGraph}) {
  const theme = useTheme();

  const [data, setData] = useState([]);
  const [graphDate, setGraphDate] = useState('aa');

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
      setGraphDate(new Date().toUTCString())
      setData(graphData);
    };

    fetchData();

  }, [refreshGraph]);

  return (       
    <React.Fragment>      
      <Title>{  graphDate } </Title>
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
          <Tooltip itemStyle={{ color: 'red' }} contentStyle={{ color: 'red' }}/>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
