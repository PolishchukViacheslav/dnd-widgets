import React from 'react';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { WidgetProps } from '../../types/widget';
import { WidgetLayout } from '../WidgetLayout/WidgetLayout';
import { RenderLegend } from '../WidgetRenderLegend/WidgetRenderLegend';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    mentions: 2400,
    amt: 2400,
    xLabel: 'Date',
    yLabel: 'Mentions',
  },
  {
    name: 'Page B',
    uv: 3000,
    mentions: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    mentions: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    mentions: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    mentions: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    mentions: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    mentions: 4300,
    amt: 2100,
  },
];

export const WidgetLineChart = React.memo(({ id, onDelete }: WidgetProps) => {
  return (
    <WidgetLayout
      title='Line Chart Widget'
      description='Line Chart Widget Description'
      id={id}
      onDelete={onDelete}
    >
      <ResponsiveContainer style={{ flex: 1 }}>
        <LineChart
          data={data}
          margin={{
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey='name' axisLine={false} />
          <YAxis
            axisLine={false}
            tickFormatter={(value) => (value ? `${value / 1000}k` : value)}
            label={{
              value: data[0].yLabel,
              position: 'insideLeft',
              offset: 10,
              angle: -90,
            }}
          />
          <Tooltip isAnimationActive={false} />
          <Line
            type='monotone'
            dataKey='mentions'
            stroke='#8884d8'
            dot={false}
          />
          <Legend
            wrapperStyle={{ bottom: 10 }}
            align='center'
            content={(props) => (
              <RenderLegend {...props} title={data[0].xLabel} iconType='line' />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </WidgetLayout>
  );
});
