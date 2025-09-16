import React from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

import type { WidgetProps } from '../../types/widget';
import { WidgetLayout } from '../WidgetLayout/WidgetLayout';
import { RenderLegend } from '../WidgetRenderLegend/WidgetRenderLegend';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
    xLabel: 'Date',
    yLabel: 'Mentions',
  },
];

export const WidgetBarChart = React.memo(({ id, onDelete }: WidgetProps) => {
  return (
    <WidgetLayout
      title='Bar Chart Widget'
      description='Bar Chart Widget Description'
      id={id}
      onDelete={onDelete}
    >
      <ResponsiveContainer style={{ flex: 1 }}>
        <BarChart data={data} margin={{ left: 10, bottom: 30 }} barGap={10}>
          <CartesianGrid vertical={false} />
          <YAxis
            dataKey='uv'
            axisLine={false}
            tickFormatter={(value) => (value ? `${value / 1000}k` : value)}
            label={{
              value: data[0].yLabel,
              position: 'insideLeft',
              offset: 10,
              angle: -90,
            }}
          />
          <Bar dataKey='amt' fill='var(--color-success)' radius={4} />
          <Bar dataKey='pv' fill='var(--color-info)' radius={4} />
          <Bar dataKey='uv' fill='var(--color-warning)' radius={4} />

          <Legend
            wrapperStyle={{ bottom: 10 }}
            align='center'
            content={(props) => (
              <RenderLegend
                {...props}
                title={data[0].xLabel}
                iconType='circle'
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </WidgetLayout>
  );
});
