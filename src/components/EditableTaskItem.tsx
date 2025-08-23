import { useState, useEffect, useRef } from 'react';
import {
  CheckSquare,
  Square,
  Edit,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Task } from '../types';
import { QUADRANT_COLORS } from '../constants/quadrants.tsx';
import { formatQuadrantName } from '../utils';

interface EditableTaskItemProps {
  task: Task;
  currentEditingTaskId: string | null;
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
  allQuadrants: Record<string, string>;
  quadrantBgColor: string;
  quadrantTextColor: string;
  quadrantCompletedBgColor: string;
}

const EditableTaskItem = ({
  task,
  currentEditingTaskId,
  onToggleComplete,
  onStartEdit,
  onDeleteTask,
  onDragStart,
  allQuadrants,
  quadrantBgColor,
  quadrantTextColor,
  quadrantCompletedBgColor,
}: EditableTaskItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editingQuadrant, setEditingQuadrant] = useState(task.quadrant);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSaveEdit = () => {
    onStartEdit(task, task.editingText, editingQuadrant, true);
  };

  const handleEditButtonClick = () => {
    onStartEdit(task, task.text, task.quadrant, false);
    setEditingQuadrant(task.quadrant);
  };

  return (
    <li
      key={task.id}
      className={`flex items-center py-2 px-1 transition-all duration-200 ease-in-out group ${
        task.completed ? quadrantCompletedBgColor : quadrantBgColor
      } relative`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id, task.quadrant)}
    >
      {currentEditingTaskId === task.id ? (
        <div
          className="flex flex-col flex-grow relative z-50"
          ref={dropdownRef}
        >
          <input
            type="text"
            ref={inputRef}
            value={task.editingText}
            onChange={(e) =>
              onStartEdit(task, e.target.value, editingQuadrant, false)
            }
            onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            className="flex-grow p-1 border border-indigo-300 rounded-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-gray-100 text-sm mb-1 bg-white dark:bg-gray-700"
            autoFocus
          />
          <button
            type="button"
            className="flex justify-between items-center w-full p-1 border border-gray-300 rounded-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span
              className={`px-2 py-0.5 rounded-sm ${
                QUADRANT_COLORS[editingQuadrant]?.optionBgColor
              } ${QUADRANT_COLORS[editingQuadrant]?.textColor}`}
            >
              {formatQuadrantName(editingQuadrant)}
            </span>
            {isDropdownOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm shadow-lg p-1 flex flex-wrap gap-1 top-full left-0">
              {Object.entries(allQuadrants).map(([key, value]) => (
                <div
                  key={key}
                  className={`flex items-center p-1 cursor-pointer rounded-sm ${
                    QUADRANT_COLORS[value]?.optionHoverBg
                  } ${
                    value === editingQuadrant
                      ? QUADRANT_COLORS[value]?.optionBgColor
                      : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingQuadrant(value);
                    setIsDropdownOpen(false);
                    inputRef.current?.focus();
                  }}
                >
                  <span
                    className={`px-2 py-0.5 rounded-sm ${
                      QUADRANT_COLORS[value]?.optionBgColor
                    } ${QUADRANT_COLORS[value]?.textColor}`}
                  >
                    {formatQuadrantName(value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center flex-grow">
          <GripVertical className="h-4 w-4 text-gray-400 dark:text-gray-500 cursor-grab mr-2 handle" />
          <button
            onClick={() => onToggleComplete(task.id, task.completed)}
            className="p-1 text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
          >
            {task.completed ? (
              <CheckSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Square className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            )}
          </button>
          <span
            className={`ml-2 text-sm ${
              task.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : quadrantTextColor
            }`}
          >
            {task.text}
          </span>
        </div>
      )}

      {currentEditingTaskId !== task.id && (
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEditButtonClick}
            className="p-1 text-gray-400 hover:text-indigo-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="p-1 text-gray-400 hover:text-red-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
      {currentEditingTaskId === task.id && (
        <button
          onClick={handleSaveEdit}
          className="ml-2 px-2 py-1 text-xs bg-indigo-600 text-white rounded-sm hover:bg-indigo-700 transition-colors duration-200"
        >
          Save
        </button>
      )}
    </li>
  );
};

export default EditableTaskItem;