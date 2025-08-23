import React from 'react';
import { Checkbox } from './ui/checkbox';
import { Task } from '../App';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, quadrant: Task['quadrant']) => void;
  showMoveOptions?: boolean;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 py-2 px-1 hover:bg-gray-50 rounded transition-colors">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        id={`task-${task.id}`}
        className="flex-shrink-0"
      />
      
      <label
        htmlFor={`task-${task.id}`}
        className={`flex-1 cursor-pointer text-sm leading-relaxed ${
          task.completed ? 'line-through text-gray-500' : 'text-gray-900'
        }`}
      >
        {task.text}
      </label>
    </div>
  );
}