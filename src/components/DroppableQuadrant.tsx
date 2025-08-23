import React from 'react';
import { useDrop } from 'react-dnd';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DraggableTaskItem } from './DraggableTaskItem';
import { Task } from '../App';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

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
  onAddTask: (text: string, quadrant?: Task['quadrant']) => void;
}

export function DroppableQuadrant({ quadrant, tasks, onToggleTask, onDeleteTask, onMoveTask, onAddTask }: DroppableQuadrantProps) {
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-lg ${quadrant.titleColor}`}>
                {quadrant.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{quadrant.description}</p>
            </div>
            <Button
              onClick={() => onAddTask('', quadrant.id)}
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5 transition-all duration-200"
              size="sm"
            >
              <Plus className="h-3 w-3" />
              <span className="text-xs font-medium">Add</span>
            </Button>
          </div>
          {isActive && (
            <p className="text-xs text-blue-600 font-medium">Drop task here</p>
          )}
        </CardHeader>
        <CardContent className="p-0 min-h-[120px]">
          <div className="space-y-0">
            {tasks
              .sort((a, b) => {
                // Sort completed tasks to the bottom
                if (a.completed && !b.completed) return 1;
                if (!a.completed && b.completed) return -1;
                return 0;
              })
              .map((task) => (
                <DraggableTaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                />
              ))}
          </div>
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