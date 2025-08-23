import React from 'react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Plus } from 'lucide-react';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 h-14 w-14 md:h-16 md:w-16 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center group animate-pulse hover:animate-none"
            size="sm"
          >
            <Plus className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:rotate-90 duration-200" />
            <span className="sr-only">Add Task</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="mb-2">
          <p>Add new task</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}