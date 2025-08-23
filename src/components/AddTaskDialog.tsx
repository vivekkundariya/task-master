import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Task } from '../App';

interface AddTaskSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (text: string, quadrant?: Task['quadrant']) => void;
}

export function AddTaskSheet({ open, onOpenChange, onAddTask }: AddTaskSheetProps) {
  const [taskText, setTaskText] = useState('');
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('backlog');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      const quadrant = selectedQuadrant === 'backlog' ? undefined : selectedQuadrant;
      onAddTask(taskText.trim(), quadrant as Task['quadrant']);
      setTaskText('');
      setSelectedQuadrant('backlog');
      onOpenChange(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when sheet is closed
      setTaskText('');
      setSelectedQuadrant('backlog');
    }
    onOpenChange(newOpen);
  };

  const quadrantOptions = [
    { value: 'backlog', label: 'Task Backlog (Unorganized)' },
    { value: 'urgent-important', label: 'Urgent & Important' },
    { value: 'not-urgent-important', label: 'Not Urgent & Important' },
    { value: 'urgent-not-important', label: 'Urgent & Not Important' },
    { value: 'not-urgent-not-important', label: 'Not Urgent & Not Important' },
  ];

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="h-[400px] sm:h-[450px]">
        <SheetHeader>
          <SheetTitle>Add New Task</SheetTitle>
          <SheetDescription>
            Create a new task and assign it to a priority quadrant using the Eisenhower Matrix.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
          <div className="space-y-2 flex-1">
            <Label htmlFor="task-text">Task Description</Label>
            <Input
              id="task-text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter task description..."
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quadrant">Priority Quadrant</Label>
            <Select value={selectedQuadrant} onValueChange={setSelectedQuadrant}>
              <SelectTrigger>
                <SelectValue placeholder="Select quadrant or leave in backlog" />
              </SelectTrigger>
              <SelectContent>
                {quadrantOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <SheetFooter className="flex-row gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={!taskText.trim()} className="flex-1">
              Add Task
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}