import type { ReactNode } from 'react';

import type { WidgetProps } from '../../types/widget';
import styles from './WidgetLayout.module.css';

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
} & WidgetProps;

export const WidgetLayout = (props: Props) => {
  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.id!);
    }
  };

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{props.title}</h5>
      {props.id !== undefined && (
        <button
          className={styles.deleteBtn}
          onMouseDown={handleDelete}
          type='button'
        >
          <span className='material-symbols-outlined'>delete</span>
        </button>
      )}
      {props.description && (
        <p className={styles.description}>{props.description}</p>
      )}
      {props.children}
    </div>
  );
};
