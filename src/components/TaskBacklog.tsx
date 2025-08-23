import React from 'react';
import { useDrop } from 'react-dnd';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DraggableTaskItem } from './DraggableTaskItem';
import { Task } from '../App';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface TaskBacklogProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, quadrant: Task['quadrant']) => void;
  onAddTask: (text: string, quadrant?: Task['quadrant']) => void;
}

export function TaskBacklog({ tasks, onToggleTask, onDeleteTask, onMoveTask, onAddTask }: TaskBacklogProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'task',
    drop: (item: { id: string; task: Task }) => {
      if (item.task.quadrant !== undefined) {
        onMoveTask(item.id, undefined);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Task Backlog</h2>
      
      <div ref={drop}>
        <Card 
          className={`border-2 transition-all duration-200 ${
            isActive ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''
          } ${isOver ? 'scale-105' : 'scale-100'}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-gray-800">Unorganized Tasks</CardTitle>
                <p className="text-sm text-gray-600">
                  Organize these tasks by moving them to the appropriate quadrant above
                </p>
              </div>
              <Button
                onClick={() => onAddTask('', undefined)}
                className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5 transition-all duration-200"
                size="sm"
              >
                <Plus className="h-3 w-3" />
                <span className="text-xs font-medium">Add</span>
              </Button>
            </div>
            {isActive && (
              <p className="text-xs text-blue-600 font-medium">Drop task here to move to backlog</p>
            )}
          </CardHeader>
          <CardContent className="min-h-[120px]">
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
              <p className="text-gray-500 text-sm italic py-8 text-center">
                No tasks in backlog. Great job staying organized!
              </p>
            )}
            {isActive && tasks.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-blue-600 font-medium">Drop task here to move to backlog</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}