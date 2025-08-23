import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types';
import { QUADRANT_COLORS } from '../constants/quadrants.tsx';
import CircularProgress from './CircularProgress';
import EditableTaskItem from './EditableTaskItem';

interface QuadrantDisplayProps {
  title: string;
  subtitle: string;
  tasks: Task[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onStartEdit: (
    task: Task,
    newText: string,
    newQuadrant: string,
    save: boolean
  ) => void;
  onDeleteTask: (id: string) => void;
  onDragStart: (
    e: React.DragEvent<HTMLLIElement>,
    taskId: string,
    quadrant: string
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, title: string) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, title: string) => void;
  currentEditingTaskId: string | null;
  totalTasksCount: number;
  completedTasksCount: number;
  quadrantKey: string;
  onAddTaskToQuadrant: (quadrantKey: string, taskText: string) => void;
  allQuadrants: Record<string, string>;
}

const QuadrantDisplay = ({
  title,
  subtitle,
  tasks,
  onToggleComplete,
  onStartEdit,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
  currentEditingTaskId,
  totalTasksCount,
  completedTasksCount,
  quadrantKey,
  onAddTaskToQuadrant,
  allQuadrants,
}: QuadrantDisplayProps) => {
  const [localNewTaskText, setLocalNewTaskText] = useState('');
  const {
    bgColor,
    borderColor,
    textColor,
    progressColorClass,
    icon,
    completedBgColor,
  } = QUADRANT_COLORS[quadrantKey];

  const handleAddTask = () => {
    if (localNewTaskText.trim() === '') return;
    onAddTaskToQuadrant(quadrantKey, localNewTaskText);
    setLocalNewTaskText('');
  };

  const isAddTaskButtonDisabled = localNewTaskText.trim() === '';

  return (
    <div
      className={`${bgColor} ${borderColor} rounded-sm shadow-sm border p-3 md:p-4 flex flex-col min-h-[300px] md:h-full overflow-visible`}
      onDragOver={(e) => onDragOver(e, title)}
      onDrop={(e) => onDrop(e, title)}
    >
      <div className="mb-2 border-b pb-2 dark:border-gray-700">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            {icon}
            <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
          </div>
          <div className="hidden md:block" style={{ color: textColor }}>
            <CircularProgress
              completed={completedTasksCount}
              total={totalTasksCount}
              size={48}
              strokeWidth={3}
              textSize="text-sm"
              progressColorClass={progressColorClass}
            />
          </div>
          <div className="block md:hidden" style={{ color: textColor }}>
            <CircularProgress
              completed={completedTasksCount}
              total={totalTasksCount}
              size={32}
              strokeWidth={2}
              textSize="text-xs"
              progressColorClass={progressColorClass}
            />
          </div>
        </div>
        <p className={`text-sm ${textColor} opacity-80 mt-0`}>{subtitle}</p>
      </div>

      <div className="relative flex items-stretch mb-2 shadow-sm rounded-sm border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
        <button
          onClick={handleAddTask}
          className={`p-2 bg-white dark:bg-gray-700 rounded-l-sm transition-all duration-200 ease-in-out ${
            isAddTaskButtonDisabled
              ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          }`}
          aria-label={`Add task to ${title}`}
          disabled={isAddTaskButtonDisabled}
        >
          <Plus className="h-5 w-5" />
        </button>
        <input
          type="text"
          className="flex-grow p-2 outline-none text-gray-700 dark:text-gray-100 text-base rounded-r-sm border-none focus:ring-0 bg-white dark:bg-gray-700"
          placeholder={`Add task to ${title}...`}
          value={localNewTaskText}
          onChange={(e) => setLocalNewTaskText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700 flex-grow overflow-visible">
        {tasks.length === 0 ? (
          <li className={`text-center ${textColor} py-3 text-sm`}>
            No tasks here.
          </li>
        ) : (
          tasks.map((task) => (
            <EditableTaskItem
              key={task.id}
              task={task}
              currentEditingTaskId={currentEditingTaskId}
              onToggleComplete={onToggleComplete}
              onStartEdit={onStartEdit}
              onDeleteTask={onDeleteTask}
              onDragStart={onDragStart}
              allQuadrants={allQuadrants}
              quadrantBgColor={bgColor}
              quadrantTextColor={textColor}
              quadrantCompletedBgColor={completedBgColor}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default QuadrantDisplay;