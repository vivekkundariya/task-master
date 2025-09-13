import { useState, useRef } from 'react';
import { X, FileUp, Clipboard } from 'lucide-react';
import { QUADRANT_COLORS, QUADRANTS } from '../constants/quadrants';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportCSV: (file: File) => Promise<{ success: boolean; message: string; importedCount?: number }>;
  onImportText: (csvText: string, skipHeader?: boolean) => Promise<{ success: boolean; message: string; importedCount?: number }>;
  theme: string;
}

const ImportModal = ({ isOpen, onClose, onImportCSV, onImportText, theme }: ImportModalProps) => {
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');
  const [csvText, setCsvText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please select a CSV file.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await onImportCSV(file);
      if (result.success) {
        alert(result.message);
        onClose();
      } else {
        alert(`Import failed: ${result.message}`);
      }
    } catch (error) {
      alert(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleTextImport = async () => {
    if (!csvText.trim()) {
      alert('Please paste CSV content.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await onImportText(csvText);
      if (result.success) {
        alert(result.message);
        setCsvText('');
        onClose();
      } else {
        alert(`Import failed: ${result.message}`);
      }
    } catch (error) {
      alert(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCsvText('');
    setActiveTab('paste');
    onClose();
  };

  const sampleCSVWithHeader = `Task,Completed,Quadrant
"task1",false,"urgentImportant"
"task2",false,"notUrgentImportant"
"task3",true,"urgentNotImportant"`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Import Tasks
          </h2>
          <button
            onClick={handleClose}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={`flex border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors duration-200 ${
              activeTab === 'paste'
                ? theme === 'dark'
                  ? 'text-indigo-400 border-b-2 border-indigo-400 bg-gray-750'
                  : 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : theme === 'dark'
                ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-750'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Clipboard className="h-4 w-4" />
            Paste CSV Text
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors duration-200 ${
              activeTab === 'upload'
                ? theme === 'dark'
                  ? 'text-indigo-400 border-b-2 border-indigo-400 bg-gray-750'
                  : 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : theme === 'dark'
                ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-750'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileUp className="h-4 w-4" />
            Upload File
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'paste' ? (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Paste your task data here (no headers needed):
                </label>
                <textarea
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder={`"task1",false,"urgentImportant"
"task2",false,"notUrgentImportant"
"task3",true,"urgentNotImportant"`}
                  className={`w-full h-40 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <button
                onClick={handleTextImport}
                disabled={isLoading || !csvText.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  isLoading || !csvText.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isLoading ? 'Importing...' : 'Import Tasks'}
              </button>
              
              <div className="space-y-4">
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  
                  <p className="mb-2">Enter each task on a new line. The format for each task should be:</p>
                  <code className={`block px-3 py-2 rounded border text-xs ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}>
                    "Task Text", Completed, "Quadrant"
                  </code>
                  
                  <div className="mt-3 space-y-3">
                    <p className="font-medium">Here's a breakdown:</p>
                    <div className="space-y-3 ml-2">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                        }`}>
                          Task Text
                        </span>
                        <span className="ml-2 text-sm">Your task description in quotes.</span>
                      </div>
                      
                      <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                        }`}>
                          Completed
                        </span>
                        <span className="ml-2 text-sm">true or false (without quotes).</span>
                      </div>
                      
                      <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                        }`}>
                          Quadrant
                        </span>
                        <span className="ml-2 text-sm">The priority quadrant in quotes. Possible values:</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 ml-8 mt-2">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.URGENT_IMPORTANT]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.URGENT_IMPORTANT]?.textColor}`}>
                        urgentImportant
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.NOT_URGENT_IMPORTANT]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.NOT_URGENT_IMPORTANT]?.textColor}`}>
                        notUrgentImportant
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.URGENT_NOT_IMPORTANT]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.URGENT_NOT_IMPORTANT]?.textColor}`}>
                        urgentNotImportant
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.NOT_URGENT_NOT_IMPORTANT]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.NOT_URGENT_NOT_IMPORTANT]?.textColor}`}>
                        notUrgentNotImportant
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.BACKLOG]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.BACKLOG]?.textColor}`}>
                        backlog
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <p className="font-medium">Example:</p>
                      <code className={`block px-3 py-2 rounded border text-xs mt-1 ${
                        theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}>
                        "Complete project proposal",false,"urgentImportant"
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-6 border-2 border-dashed rounded-lg text-center ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700' 
                  : 'border-gray-300 bg-gray-50'
              }`}>
                <FileUp className={`h-12 w-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className={`text-lg font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Upload CSV File
                </p>
                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Select a CSV file to import your tasks
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isLoading ? 'Uploading...' : 'Choose File'}
                </button>
              </div>

              <div className="space-y-4">
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p className="mb-2">Create a CSV file with the following format. Include the header row:</p>
                  <code className={`block px-3 py-2 rounded border text-xs ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}>
                    Task, Completed, Quadrant
                  </code>
                  
                  <div className="mt-3 space-y-3">
                    <p className="font-medium">Here's a breakdown:</p>
                    <div className="space-y-3 ml-2">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                        }`}>
                          Task Text
                        </span>
                        <span className="ml-2 text-sm">Your task description in quotes.</span>
                      </div>
                      
                      <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                        }`}>
                          Completed
                        </span>
                        <span className="ml-2 text-sm">true or false (without quotes).</span>
                      </div>
                      
                      <div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                        }`}>
                          Quadrant
                        </span>
                        <span className="ml-2 text-sm">The priority quadrant in quotes. Possible values:</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 ml-8 mt-2">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.URGENT_IMPORTANT]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.URGENT_IMPORTANT]?.textColor}`}>
                        urgentImportant
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.NOT_URGENT_IMPORTANT]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.NOT_URGENT_IMPORTANT]?.textColor}`}>
                        notUrgentImportant
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.URGENT_NOT_IMPORTANT]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.URGENT_NOT_IMPORTANT]?.textColor}`}>
                        urgentNotImportant
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.NOT_URGENT_NOT_IMPORTANT]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.NOT_URGENT_NOT_IMPORTANT]?.textColor}`}>
                        notUrgentNotImportant
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        QUADRANT_COLORS[QUADRANTS.BACKLOG]?.optionBgColor
                      } ${QUADRANT_COLORS[QUADRANTS.BACKLOG]?.textColor}`}>
                        backlog
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <p className="font-medium">Example CSV file content:</p>
                      <pre className={`px-3 py-2 rounded border text-xs mt-1 whitespace-pre-line ${
                        theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}>
{sampleCSVWithHeader}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            💡 Tip: Export your current tasks first to see the exact format
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
