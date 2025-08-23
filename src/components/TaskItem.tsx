import React from 'react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Trash2, Move } from 'lucide-react';
import { Task } from '../App';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, quadrant: Task['quadrant']) => void;
  showMoveOptions?: boolean;
}

export function TaskItem({ task, onToggle, onDelete, onMove, showMoveOptions = false }: TaskItemProps) {
  const quadrantOptions = [
    { id: 'urgent-important', label: 'Urgent & Important' },
    { id: 'not-urgent-important', label: 'Not Urgent & Important' },
    { id: 'urgent-not-important', label: 'Urgent & Not Important' },
    { id: 'not-urgent-not-important', label: 'Not Urgent & Not Important' },
    { id: undefined, label: 'Move to Backlog' },
  ] as const;

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border group hover:shadow-sm transition-shadow cursor-grab active:cursor-grabbing">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        id={`task-${task.id}`}
      />
      
      <label
        htmlFor={`task-${task.id}`}
        className={`flex-1 cursor-pointer text-sm ${
          task.completed ? 'line-through text-gray-500' : 'text-gray-900'
        }`}
      >
        {task.text}
      </label>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {showMoveOptions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Move className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {quadrantOptions.map((option) => (
                <DropdownMenuItem
                  key={option.id || 'backlog'}
                  onClick={() => onMove(task.id, option.id)}
                  className="text-sm"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}