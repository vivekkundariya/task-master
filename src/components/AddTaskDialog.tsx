import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Task } from '../App';

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (text: string, quadrant?: Task['quadrant']) => void;
}

export function AddTaskDialog({ open, onOpenChange, onAddTask }: AddTaskDialogProps) {
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
      // Reset form when dialog is closed
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task and assign it to a priority quadrant using the Eisenhower Matrix.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
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

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!taskText.trim()}>
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}