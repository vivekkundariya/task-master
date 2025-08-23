import { Plus, Loader2 } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { QUADRANTS, QUADRANT_COLORS } from '../constants/quadrants.tsx';
import QuadrantDisplay from './QuadrantDisplay';
import Header from './Header';
import EditableTaskItem from './EditableTaskItem';
import CircularProgress from './CircularProgress';

const App = () => {
  const {
    editingTaskId,
    editingTaskText,
    isLoading,
    userName,
    isEditingName,
    theme,
    nameInputRef,
    addTaskToQuadrant,
    toggleTaskCompletion,
    startEditing,
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
    setEditingTaskText,
  } = useTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-inter">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
        <span className="ml-2 text-gray-700">Loading your tasks...</span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'
      } p-4 sm:p-6 lg:p-8 font-inter antialiased flex flex-col items-center transition-colors duration-300`}
    >
      <div className="w-full max-w-6xl">
        <Header
          userName={userName}
          isEditingName={isEditingName}
          nameInputRef={nameInputRef}
          handleNameEdit={handleNameEdit}
          handleNameChange={handleNameChange}
          handleNameKeyPress={handleNameKeyPress}
          handleNameSave={handleNameSave}
          toggleTheme={toggleTheme}
          theme={theme}
          handleDownloadCSV={handleDownloadCSV}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 h-[70vh]">
          <QuadrantDisplay
            title="Urgent & Important"
            subtitle="Act Now, Conquer Fast!"
            tasks={getTasksForQuadrant(QUADRANTS.URGENT_IMPORTANT)}
            onToggleComplete={toggleTaskCompletion}
            onStartEdit={startEditing}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            currentEditingTaskId={editingTaskId}
            totalTasksCount={getTotalTasksCount(QUADRANTS.URGENT_IMPORTANT)}
            completedTasksCount={getCompletedTasksCount(
              QUADRANTS.URGENT_IMPORTANT
            )}
            quadrantKey={QUADRANTS.URGENT_IMPORTANT}
            onAddTaskToQuadrant={addTaskToQuadrant}
            allQuadrants={QUADRANTS}
          />
          <QuadrantDisplay
            title="Not Urgent & Important"
            subtitle="Plan Smart, Grow Strong!"
            tasks={getTasksForQuadrant(QUADRANTS.NOT_URGENT_IMPORTANT)}
            onToggleComplete={toggleTaskCompletion}
            onStartEdit={startEditing}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            currentEditingTaskId={editingTaskId}
            totalTasksCount={getTotalTasksCount(QUADRANTS.NOT_URGENT_IMPORTANT)}
            completedTasksCount={getCompletedTasksCount(
              QUADRANTS.NOT_URGENT_IMPORTANT
            )}
            quadrantKey={QUADRANTS.NOT_URGENT_IMPORTANT}
            onAddTaskToQuadrant={addTaskToQuadrant}
            allQuadrants={QUADRANTS}
          />
          <QuadrantDisplay
            title="Urgent & Not Important"
            subtitle="Empower Others, Free Your Time!"
            tasks={getTasksForQuadrant(QUADRANTS.URGENT_NOT_IMPORTANT)}
            onToggleComplete={toggleTaskCompletion}
            onStartEdit={startEditing}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            currentEditingTaskId={editingTaskId}
            totalTasksCount={getTotalTasksCount(
              QUADRANTS.URGENT_NOT_IMPORTANT
            )}
            completedTasksCount={getCompletedTasksCount(
              QUADRANTS.URGENT_NOT_IMPORTANT
            )}
            quadrantKey={QUADRANTS.URGENT_NOT_IMPORTANT}
            onAddTaskToQuadrant={addTaskToQuadrant}
            allQuadrants={QUADRANTS}
          />
          <QuadrantDisplay
            title="Not Urgent & Not Important"
            subtitle="Cut the Clutter, Focus on What Matters!"
            tasks={getTasksForQuadrant(QUADRANTS.NOT_URGENT_NOT_IMPORTANT)}
            onToggleComplete={toggleTaskCompletion}
            onStartEdit={startEditing}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            currentEditingTaskId={editingTaskId}
            totalTasksCount={getTotalTasksCount(
              QUADRANTS.NOT_URGENT_NOT_IMPORTANT
            )}
            completedTasksCount={getCompletedTasksCount(
              QUADRANTS.NOT_URGENT_NOT_IMPORTANT
            )}
            quadrantKey={QUADRANTS.NOT_URGENT_NOT_IMPORTANT}
            onAddTaskToQuadrant={addTaskToQuadrant}
            allQuadrants={QUADRANTS}
          />
        </div>

        <div
          className={`${QUADRANT_COLORS[QUADRANTS.BACKLOG].bgColor} ${
            QUADRANT_COLORS[QUADRANTS.BACKLOG].borderColor
          } rounded-sm shadow-lg border mt-8 p-4`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 border-b pb-2 dark:border-gray-700">
            <div className="flex items-center">
              {QUADRANT_COLORS[QUADRANTS.BACKLOG]?.icon}
              <h2
                className={`text-2xl font-bold ${
                  QUADRANT_COLORS[QUADRANTS.BACKLOG].textColor
                } mr-4`}
              >
                Backlog
              </h2>
            </div>
            <p
              className={`text-md ${
                QUADRANT_COLORS[QUADRANTS.BACKLOG].textColor
              } opacity-80 mt-1`}
            >
              Ideas Brewing, Ready to Prioritize!
            </p>
            <CircularProgress
              completed={getCompletedTasksCount(QUADRANTS.BACKLOG)}
              total={getTotalTasksCount(QUADRANTS.BACKLOG)}
              size={48}
              strokeWidth={3}
              textSize="text-sm"
              progressColorClass={
                QUADRANT_COLORS[QUADRANTS.BACKLOG].progressColorClass
              }
            />
          </div>

          <div className="relative flex items-stretch mb-2 shadow-sm rounded-sm border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
            <button
              onClick={() =>
                addTaskToQuadrant(QUADRANTS.BACKLOG, editingTaskText)
              }
              className={`p-2 bg-white dark:bg-gray-700 rounded-l-sm transition-all duration-200 ease-in-out ${
                editingTaskText.trim() === ''
                  ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              }`}
              aria-label="Add task to backlog"
              disabled={editingTaskText.trim() === ''}
            >
              <Plus className="h-5 w-5" />
            </button>
            <input
              type="text"
              className="flex-grow p-2 outline-none text-gray-700 dark:text-gray-100 text-base rounded-r-sm border-none focus:ring-0 bg-white dark:bg-gray-700"
              placeholder="Add a new task to backlog..."
              value={editingTaskText}
              onChange={(e) => setEditingTaskText(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' &&
                addTaskToQuadrant(QUADRANTS.BACKLOG, editingTaskText)
              }
            />
          </div>

          <div
            className="flex-grow overflow-visible min-h-[100px]"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, 'Backlog')}
          >
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {getTasksForQuadrant(QUADRANTS.BACKLOG).length === 0 ? (
                <li
                  className={`text-center ${
                    QUADRANT_COLORS[QUADRANTS.BACKLOG].textColor
                  } py-3 text-sm`}
                >
                  Drag tasks here or add new ones!
                </li>
              ) : (
                getTasksForQuadrant(QUADRANTS.BACKLOG).map((task) => (
                  <EditableTaskItem
                    key={task.id}
                    task={task}
                    currentEditingTaskId={editingTaskId}
                    onToggleComplete={toggleTaskCompletion}
                    onStartEdit={startEditing}
                    onDeleteTask={deleteTask}
                    onDragStart={handleDragStart}
                    allQuadrants={QUADRANTS}
                    quadrantBgColor={
                      QUADRANT_COLORS[QUADRANTS.BACKLOG].bgColor
                    }
                    quadrantTextColor={
                      QUADRANT_COLORS[QUADRANTS.BACKLOG].textColor
                    }
                    quadrantCompletedBgColor={
                      QUADRANT_COLORS[QUADRANTS.BACKLOG].completedBgColor
                    }
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;