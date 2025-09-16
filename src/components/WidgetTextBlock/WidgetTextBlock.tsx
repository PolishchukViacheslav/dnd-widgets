import React from 'react';

import { WidgetLayout } from '../WidgetLayout/WidgetLayout';
import styles from './WidgetTextBlock.module.css';

export const WidgetTextBlock = React.memo(() => {
  return (
    <WidgetLayout title='Text Block Widget'>
      <div className={styles.container}>
        <p>
          YouScan’s AI-powered Visual Insights capability detects logos,
          objects, scenes, activities and demographic information on images. It
          describes images in vivid detail enabling brands and agencies to get
          instant access to valuable consumer insights.
        </p>
        <p>
          access to valuable consumer insights. See your product's real-world
          consumption situations, conduct competitor analysis, measure brand
          visibility, find inspiration for marketing campaigns, understand your
          buyer persona better, find influencers and brand ambassadors with
          Visual Insights. access to valuable consumer insights.
        </p>
      </div>
    </WidgetLayout>
  );
});
