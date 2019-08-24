import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line,
} from 'recharts';

export const ChartItem = (props) => {
  const { data, xKey, valKey } = props;
  return (
    <ResponsiveContainer height="75%" width="90%">
      <LineChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey={valKey} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

ChartItem.propTypes = {
  data: PropTypes.array.isRequired,
  xKey: PropTypes.string,
  valKey: PropTypes.string,
};

ChartItem.defaultProps = {
  xKey: 'end',
  valKey: 'value',
};

export default ChartItem;
