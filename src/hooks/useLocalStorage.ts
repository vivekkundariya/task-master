import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const localValue = window.localStorage.getItem(key);
      if (localValue === null) {
        return initialValue;
      }
      // Handle string values without JSON parsing to avoid quotation mark issues
      if (typeof initialValue === 'string') {
        return localValue as T;
      }
      return JSON.parse(localValue);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // Handle string values without JSON stringifying to avoid quotation mark issues
      if (typeof value === 'string') {
        window.localStorage.setItem(key, value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}