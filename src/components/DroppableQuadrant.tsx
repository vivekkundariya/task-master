import React from 'react';
import { useDrop } from 'react-dnd';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DraggableTaskItem } from './DraggableTaskItem';
import { Task } from '../App';

interface DroppableQuadrantProps {
  quadrant: {
    id: Task['quadrant'];
    title: string;
    description: string;
    color: string;
    titleColor: string;
  };
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, quadrant: Task['quadrant']) => void;
}

export function DroppableQuadrant({ quadrant, tasks, onToggleTask, onDeleteTask, onMoveTask }: DroppableQuadrantProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'task',
    drop: (item: { id: string; task: Task }) => {
      if (item.task.quadrant !== quadrant.id) {
        onMoveTask(item.id, quadrant.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div ref={drop}>
      <Card 
        className={`${quadrant.color} border-2 transition-all duration-200 ${
          isActive ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
        } ${isOver ? 'scale-105' : 'scale-100'}`}
      >
        <CardHeader className="pb-4">
          <CardTitle className={`text-lg ${quadrant.titleColor}`}>
            {quadrant.title}
          </CardTitle>
          <p className="text-sm text-gray-600">{quadrant.description}</p>
          {isActive && (
            <p className="text-xs text-blue-600 font-medium">Drop task here</p>
          )}
        </CardHeader>
        <CardContent className="space-y-2 min-h-[120px]">
          {tasks.map((task) => (
            <DraggableTaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onMove={onMoveTask}
            />
          ))}
          {tasks.length === 0 && !isActive && (
            <p className="text-gray-500 text-sm italic py-4">No tasks in this quadrant</p>
          )}
          {isActive && tasks.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-blue-600 font-medium">Drop task here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}