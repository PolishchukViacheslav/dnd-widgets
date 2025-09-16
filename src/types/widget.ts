export type WidgetProps = {
  id?: number;
  onDelete?: (id: number) => void;
};

export const WidgetType = {
  BAR: 'bar',
  LINE: 'line',
  TEXT: 'text',
  EMPTY: 'empty',
} as const;

export type AddableWidgetType = Exclude<
  (typeof WidgetType)[keyof typeof WidgetType],
  'empty'
>;
