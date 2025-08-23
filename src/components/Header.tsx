import { Edit, Sun, Moon, FileDown } from 'lucide-react';

interface HeaderProps {
  userName: string;
  isEditingName: boolean;
  nameInputRef: React.RefObject<HTMLInputElement>;
  handleNameEdit: () => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleNameSave: () => void;
  toggleTheme: () => void;
  theme: string;
  handleDownloadCSV: () => void;
}

const Header = ({
  userName,
  isEditingName,
  nameInputRef,
  handleNameEdit,
  handleNameChange,
  handleNameKeyPress,
  handleNameSave,
  toggleTheme,
  theme,
  handleDownloadCSV,
}: HeaderProps) => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <>
      <div className="flex justify-between items-center mb-8 px-4 py-2">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-600 dark:text-gray-300 mr-2">
              {currentTime}
            </span>
            <span className="text-xl font-semibold text-gray-300 dark:text-gray-600 mr-2">
              |
            </span>
            {isEditingName ? (
              <input
                ref={nameInputRef}
                type="text"
                value={userName}
                onChange={handleNameChange}
                onKeyPress={handleNameKeyPress}
                onBlur={handleNameSave}
                className="text-2xl font-bold text-gray-900 dark:text-gray-100 bg-transparent border-b-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center cursor-pointer"
                onClick={handleNameEdit}
              >
                Hello {userName}
                <Edit className="h-5 w-5 ml-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200" />
              </h2>
            )}
          </div>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-1">
            Your day, your priorities, perfectly managed.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
            )}
          </button>
          <button
            onClick={handleDownloadCSV}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Download tasks as CSV"
          >
            <FileDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Main Eisenhower Matrix Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 flex items-center justify-center">
        <Sun className="h-8 w-8 text-yellow-500 mr-3" />
        Eisenhower Matrix
      </h1>
    </>
  );
};

export default Header;