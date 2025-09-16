import type { ReactNode } from 'react';

import styles from './WidgetLayout.module.css';

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export const WidgetLayout = (props: Props) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{props.title}</h5>
      {props.description && (
        <p className={styles.description}>{props.description}</p>
      )}
      {props.children}
    </div>
  );
};
