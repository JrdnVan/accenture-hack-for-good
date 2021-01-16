import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function Graph(props) {
  return(
    <LineChart
      width={700}
      height={480}
      data={props.data}
      margin={{
        top: 25, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sentimentRatio" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
}
export default Graph;