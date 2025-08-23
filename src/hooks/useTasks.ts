import { useState, useEffect, useCallback, useRef } from 'react';
import { Task } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { QUADRANTS } from '../constants/quadrants.tsx';

const LOCAL_STORAGE_KEY = 'eisenhower-matrix-tasks';
const USER_NAME_KEY = 'eisenhower-matrix-user-name';
const THEME_KEY = 'eisenhower-matrix-theme';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEY, []);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [draggedItem, setDraggedItem] = useState<{
    taskId: string;
    currentQuadrant: string;
  } | null>(null);
  const [userName, setUserName] = useLocalStorage(USER_NAME_KEY, 'User');
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useLocalStorage(THEME_KEY, 'light');

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(
          parsedTasks.map((task: Task) => ({ ...task, editingText: task.text }))
        );
      }
      const storedUserName = localStorage.getItem(USER_NAME_KEY);
      if (storedUserName) {
        setUserName(storedUserName);
      }
      const storedTheme = localStorage.getItem(THEME_KEY);
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle(
          'dark',
          storedTheme === 'dark'
        );
      } else {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        setTheme(initialTheme);
        document.documentElement.classList.toggle(
          'dark',
          initialTheme === 'dark'
        );
      }
    } catch (error) {
      console.error('Error loading data from local storage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      localStorage.setItem(USER_NAME_KEY, userName);
      localStorage.setItem(THEME_KEY, theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [tasks, isLoading, userName, theme]);

  const addTaskToQuadrant = (quadrantKey: string, taskText: string) => {
    if (taskText.trim() === '') return;

    const newTaskId = crypto.randomUUID();
    const newTask: Task = {
      id: newTaskId,
      text: taskText,
      completed: false,
      quadrant: quadrantKey,
      createdAt: new Date().toISOString(),
      editingText: taskText,
    };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      updatedTasks.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      });
      return updatedTasks;
    });
    setEditingTaskText('');
  };

  const toggleTaskCompletion = (id: string, completed: boolean) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      );
      updatedTasks.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      });
      return updatedTasks;
    });
  };

  const startEditing = (
    task: Task,
    newText: string,
    newQuadrant: string,
    save = false
  ) => {
    if (save) {
      if (newText.trim() === '') {
        cancelEdit();
        return;
      }
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id
            ? { ...t, text: newText, editingText: newText, quadrant: newQuadrant }
            : t
        )
      );
      setEditingTaskId(null);
      setEditingTaskText('');
    } else {
      setEditingTaskId(task.id);
      setEditingTaskText(newText);
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, editingText: newText } : t
        )
      );
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === editingTaskId ? { ...t, editingText: t.text } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    taskId: string,
    currentQuadrant: string
  ) => {
    setDraggedItem({ taskId, currentQuadrant });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetQuadrantTitle: string
  ) => {
    e.preventDefault();

    if (!draggedItem) {
      console.error('No item being dragged for drop.');
      return;
    }

    let targetQuadrant;
    switch (targetQuadrantTitle) {
      case 'Urgent & Important':
        targetQuadrant = QUADRANTS.URGENT_IMPORTANT;
        break;
      case 'Not Urgent & Important':
        targetQuadrant = QUADRANTS.NOT_URGENT_IMPORTANT;
        break;
      case 'Urgent & Not Important':
        targetQuadrant = QUADRANTS.URGENT_NOT_IMPORTANT;
        break;
      case 'Not Urgent & Not Important':
        targetQuadrant = QUADRANTS.NOT_URGENT_NOT_IMPORTANT;
        break;
      case 'Backlog':
        targetQuadrant = QUADRANTS.BACKLOG;
        break;
      default:
        console.error('Unknown target quadrant title:', targetQuadrantTitle);
        return;
    }

    const { taskId, currentQuadrant } = draggedItem;

    if (currentQuadrant === targetQuadrant) {
      setDraggedItem(null);
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, quadrant: targetQuadrant } : task
      );
      updatedTasks.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      });
      return updatedTasks;
    });
    setDraggedItem(null);
  };

  const getTasksForQuadrant = useCallback(
    (quadrantKey: string) => {
      return tasks
        .filter((task) => task.quadrant === quadrantKey)
        .map((task) =>
          task.id === editingTaskId
            ? { ...task, editingText: editingTaskText }
            : task
        );
    },
    [tasks, editingTaskId, editingTaskText]
  );

  const getTotalTasksCount = useCallback(
    (quadrantKey: string) => {
      return tasks.filter((task) => task.quadrant === quadrantKey).length;
    },
    [tasks]
  );

  const getCompletedTasksCount = useCallback(
    (quadrantKey: string) => {
      return tasks.filter(
        (task) => task.quadrant === quadrantKey && task.completed
      ).length;
    },
    [tasks]
  );

  const handleNameEdit = () => {
    setIsEditingName(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 0);
  };

  const handleNameSave = () => {
    if (userName.trim() === '') {
      setUserName('User');
    }
    setIsEditingName(false);
    localStorage.setItem(USER_NAME_KEY, userName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleNameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleDownloadCSV = () => {
    const headers = ['ID', 'Task', 'Completed', 'Quadrant', 'Created At'];
    const csvRows = tasks.map(
      (task) =>
        `${task.id},"${task.text.replace(/"/g, '""')}",${task.completed},${
          task.quadrant
        },${task.createdAt}`
    );
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'eisenhower_matrix_tasks.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    tasks,
    editingTaskId,
    editingTaskText,
    isLoading,
    draggedItem,
    userName,
    isEditingName,
    nameInputRef,
    theme,
    setTasks,
    setEditingTaskId,
    setEditingTaskText,
    setIsLoading,
    setDraggedItem,
    setUserName,
    setIsEditingName,
    setTheme,
    addTaskToQuadrant,
    toggleTaskCompletion,
    startEditing,
    cancelEdit,
    deleteTask,
    handleDragStart,
    handleDragOver,
    handleDrop,
    getTasksForQuadrant,
    getTotalTasksCount,
    getCompletedTasksCount,
    handleNameEdit,
    handleNameSave,
    handleNameChange,
    handleNameKeyPress,
    toggleTheme,
    handleDownloadCSV,
  };
};