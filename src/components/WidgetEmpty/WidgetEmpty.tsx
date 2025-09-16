import { WidgetLayout } from '../WidgetLayout/WidgetLayout';
import styles from './WidgetEmpty.module.css';

export const WidgetEmpty = () => {
  return (
    <WidgetLayout>
      <p className={styles.container}>Drag and drop widget here</p>
    </WidgetLayout>
  );
};
