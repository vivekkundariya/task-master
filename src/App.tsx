import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from './components/Header';
import { FocusOfTheDay } from './components/FocusOfTheDay';
import { TaskBacklog } from './components/TaskBacklog';
import { Footer } from './components/Footer';
import { AddTaskDialog } from './components/AddTaskDialog';
import { FloatingAddButton } from './components/FloatingAddButton';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  quadrant?: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Complete project documentation', completed: false, quadrant: 'urgent-important' },
    { id: '2', text: 'Prepare presentation slides', completed: false, quadrant: 'urgent-important' },
    { id: '3', text: 'Email client feedback', completed: false, quadrant: 'urgent-important' },
    { id: '4', text: 'Complete project documentation', completed: false, quadrant: 'not-urgent-important' },
    { id: '5', text: 'Prepare presentation slides', completed: false, quadrant: 'not-urgent-important' },
    { id: '6', text: 'Email client feedback', completed: false, quadrant: 'not-urgent-important' },
    { id: '7', text: 'Complete project documentation', completed: false, quadrant: 'urgent-not-important' },
    { id: '8', text: 'Prepare presentation slides', completed: false, quadrant: 'urgent-not-important' },
    { id: '9', text: 'Email client feedback', completed: false, quadrant: 'urgent-not-important' },
    { id: '10', text: 'Complete project documentation', completed: false, quadrant: 'not-urgent-not-important' },
    { id: '11', text: 'Prepare presentation slides', completed: false, quadrant: 'not-urgent-not-important' },
    { id: '12', text: 'Email client feedback', completed: false, quadrant: 'not-urgent-not-important' },
    { id: '13', text: 'Complete project documentation', completed: false },
    { id: '14', text: 'Prepare presentation slides', completed: false },
    { id: '15', text: 'Email client feedback', completed: false },
    { id: '16', text: 'Complete project documentation', completed: false },
  ]);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const addTask = (text: string, quadrant?: Task['quadrant']) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      quadrant,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveTask = (id: string, quadrant: Task['quadrant']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, quadrant } : task
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8 pb-24 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Todo Master</h1>
          </div>

          <FocusOfTheDay 
            tasks={tasks} 
            onToggleTask={toggleTask} 
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
          />
          
          <TaskBacklog 
            tasks={tasks.filter(task => !task.quadrant)} 
            onToggleTask={toggleTask} 
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
          />
        </main>

        <Footer />

        {/* Floating Action Button */}
        <FloatingAddButton onClick={() => setIsAddTaskOpen(true)} />

        <AddTaskDialog 
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onAddTask={addTask}
        />
      </div>
    </DndProvider>
  );
}