import React from 'react';

import { useDraggable } from '@dnd-kit/core';

interface Props {
  widgetIndex: number;
  widgetType: string;
  children: React.ReactNode;
}

export const DraggableSlot = ({ widgetIndex, widgetType, children }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `widget-${widgetIndex}`,
      data: { widgetIndex, widgetType },
    });

  const style = {
    position: 'relative',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: 'grab',
    width: '100%',
    height: '100%',
    border: '2px solid transparent',
    zIndex: isDragging ? 1000 : '1',
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
