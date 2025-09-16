import type { LegendPayload } from 'recharts';

import styles from './WidgetRenderLegend.module.css';

type Props = {
  payload?: readonly LegendPayload[];
  iconType: 'circle' | 'line';
  title?: string;
};

export const RenderLegend = (props: Props) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{props.title}</h5>
      <ul className={styles.list}>
        {props.payload?.map((item, idx) => (
          <li
            key={idx}
            className={styles.listItem}
            style={
              { ['--color-legend-item']: item.color } as React.CSSProperties
            }
          >
            <span className={styles[props.iconType]} />
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};
