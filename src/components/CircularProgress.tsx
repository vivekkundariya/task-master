interface CircularProgressProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  textSize?: string;
  progressColorClass?: string;
}

const CircularProgress = ({
  completed,
  total,
  size = 24,
  strokeWidth = 4,
  textSize = 'text-sm',
  progressColorClass = 'text-indigo-600',
}: CircularProgressProps) => {
  const viewboxSize = size + strokeWidth * 2;
  const radius = (size - strokeWidth) / 2; // Adjusted radius to account for stroke width
  const circumference = 2 * Math.PI * radius;
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${viewboxSize} ${viewboxSize}`}
      >
        <circle
          className="text-gray-300 dark:text-gray-600"
          strokeWidth={strokeWidth + 0.5}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={viewboxSize / 2}
          cy={viewboxSize / 2}
        />
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={viewboxSize / 2}
          cy={viewboxSize / 2}
        />
        <circle
          className={`${progressColorClass} transition-all duration-700 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={viewboxSize / 2}
          cy={viewboxSize / 2}
          transform={`rotate(-90 ${viewboxSize / 2} ${viewboxSize / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`${textSize} font-semibold text-gray-700 dark:text-gray-300 leading-none`}
          style={{ fontSize: `${Math.max(8, size * 0.3)}px` }}
        >
          {completed}/{total}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;