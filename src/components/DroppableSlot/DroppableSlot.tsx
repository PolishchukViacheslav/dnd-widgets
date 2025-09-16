import { useDroppable } from '@dnd-kit/core';

export const DroppableSlot = ({
  slotIndex,
  children,
}: {
  slotIndex: number;
  children: React.ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `slot-${slotIndex}`,
    data: { slotIndex },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'relative',
        border: isOver
          ? '2px dashed var(--color-primary)'
          : '2px dashed transparent',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        zIndex: isOver ? 0 : undefined,
      }}
    >
      {children}
    </div>
  );
};
