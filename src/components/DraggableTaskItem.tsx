import React from 'react';
import { useDrag } from 'react-dnd';
import { TaskItem } from './TaskItem';
import { Task } from '../App';

interface DraggableTaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function DraggableTaskItem({ task, onToggle }: DraggableTaskItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <TaskItem
        task={task}
        onToggle={onToggle}
      />
    </div>
  );
}