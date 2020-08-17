import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Line,
} from 'recharts';

import { todayFormated } from '../../shared/utils';

const useStyles = makeStyles(theme => ({
  filter: {
    backdropFilter: 'blur(2px)' /* Chrome and Opera */,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '1px',
    /*  box-shadow: 2px 2px 1px rgba(255, 255, 255, 0.7); */
  },
  pstyle: {
    margin: '0px',
    padding: '2px',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 'medium',
  },
}));

const CustomTooltip = ({ active, payload, label }) => {
  const classes = useStyles();
  if (active && payload[0]) {
    return (
      <div className={classes.filter}>
        <p className={classes.pstyle}>{`${label} ${
          label === todayFormated ? 'Today' : ''
        }`}</p>
        <p className={classes.pstyle}>{`Cases : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function BarGraph(props) {
  const { data, mainBarColor, refLine } = props;
  let graph = <></>;
  if (data && data.length) {
    graph = (
      <ResponsiveContainer width={'99%'} height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="cases" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === data.length - 1 ? '#82ca9d' : mainBarColor}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
          <Line
            type="monotone"
            dataKey="cases3"
            stroke="#ff7300"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="cases7"
            stroke="#82ca9d"
            dot={false}
            strokeWidth={2}
          />
          {refLine && (
            <ReferenceLine
              y={data[data.length - 1].cases}
              label=""
              stroke="red"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
  return graph;
}
