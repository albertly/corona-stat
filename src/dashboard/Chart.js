import React, { useState, useEffect  } from 'react';
import axios from 'axios';

import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

// const data = [
//   createData('00:00', 0),
//   createData('01:30', 50),
//   createData('03:00', 300),
//   createData('04:30', 400),
//   createData('06:00', 600),
//   createData('07:30', 650),
//   createData('09:00', 800),
//   // createData('10:30', 1200),
//   // createData('12:00', 1500),
//   // createData('13:30', 1780),
//   // createData('15:00', 2000),
//   // createData('16:30', 2200),
//   // createData('18:00', 2400),
//   // createData('19:30', 2400),
//   // createData('21:00', 2400),
//   // createData('22:30', 2700),
//   // createData('24:00', 3700),
// ];

export default function Chart() {
  const theme = useTheme();

  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('prob');

      const graphData = result.data.map(e => (
          { 
            time: e.probeTime,
            amount: parseInt(e.newCases)
          }
        )
      )

      setData(graphData);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Today</Title>
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
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
