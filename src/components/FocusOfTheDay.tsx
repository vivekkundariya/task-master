import React from 'react';
import { DroppableQuadrant } from './DroppableQuadrant';
import { Task } from '../App';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface FocusOfTheDayProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, quadrant: Task['quadrant']) => void;
  onAddTask: (text: string, quadrant?: Task['quadrant']) => void;
}

export function FocusOfTheDay({ tasks, onToggleTask, onDeleteTask, onMoveTask, onAddTask }: FocusOfTheDayProps) {
  const getTasksByQuadrant = (quadrant: Task['quadrant']) => {
    return tasks.filter(task => task.quadrant === quadrant);
  };

  const quadrants = [
    {
      id: 'urgent-important' as const,
      title: 'Urgent & Important',
      description: 'Do First',
      color: 'border-red-200 bg-red-50',
      titleColor: 'text-red-800',
    },
    {
      id: 'not-urgent-important' as const,
      title: 'not Urgent & Important',
      description: 'Schedule',
      color: 'border-blue-200 bg-blue-50',
      titleColor: 'text-blue-800',
    },
    {
      id: 'urgent-not-important' as const,
      title: 'Urgent & Not Important',
      description: 'Delegate',
      color: 'border-orange-200 bg-orange-50',
      titleColor: 'text-orange-800',
    },
    {
      id: 'not-urgent-not-important' as const,
      title: 'Not Urgent & Not Important',
      description: 'Delete',
      color: 'border-gray-200 bg-gray-50',
      titleColor: 'text-gray-800',
    },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Focus of the Day</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quadrants.map((quadrant) => (
          <DroppableQuadrant
            key={quadrant.id}
            quadrant={quadrant}
            tasks={getTasksByQuadrant(quadrant.id)}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onMoveTask={onMoveTask}
            onAddTask={onAddTask}
          />
        ))}
      </div>
    </section>
  );
}