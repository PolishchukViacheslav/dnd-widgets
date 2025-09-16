import React from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import styles from './App.module.css';
import { WidgetBarChart } from './components/WidgetBarChart/WidgetBarChart';
import { WidgetEmpty } from './components/WidgetEmpty/WidgetEmpty';
import { WidgetLineChart } from './components/WidgetLineChart/WidgetLineChart';
import { WidgetTextBlock } from './components/WidgetTextBlock/WidgetTextBlock';

const WidgetType = {
  BAR: 'bar',
  LINE: 'line',
  TEXT: 'text',
  EMPTY: 'empty',
} as const;

const widgets = [0, 1, 2, ...Array.from({ length: 1000 })];

const widgetsMap = {
  [WidgetType.BAR]: WidgetBarChart,
  [WidgetType.LINE]: WidgetLineChart,
  [WidgetType.TEXT]: WidgetTextBlock,
  [WidgetType.EMPTY]: WidgetEmpty,
};

const occupiedSlots = new Map([
  [0, WidgetType.BAR],
  [1, WidgetType.LINE],
  [2, WidgetType.TEXT],
  [23, WidgetType.LINE],
]);

const COLUMNS = 3;

function App() {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const totalRows = Math.ceil(widgets.length / COLUMNS);

  const virtualizer = useVirtualizer({
    count: totalRows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 10,
  });

  return (
    <div ref={parentRef} className={styles.container}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
        className={styles.scrollBox}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const startIndex = rowIndex * COLUMNS;

          return (
            <div
              key={virtualRow.key}
              style={
                {
                  ['--height']: `${virtualRow.size}px`,
                  ['--transform']: `${virtualRow.start}px`,
                } as React.CSSProperties
              }
              className={styles.rowWrapper}
            >
              {Array.from({ length: COLUMNS }, (_, colIndex) => {
                const widgetIndex = startIndex + colIndex;
                if (widgetIndex >= widgets.length) return null;

                const WidgetRender =
                  widgetsMap[
                    occupiedSlots.get(widgetIndex) ?? WidgetType.EMPTY
                  ];

                return (
                  <div key={widgetIndex} className={styles.widgetWrapper}>
                    <WidgetRender />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
