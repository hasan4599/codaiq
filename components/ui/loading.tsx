'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';

interface LoadingProps {
  title?: string;
  className?: string;
  fullHeight?: boolean;
}

export function Loading({ title = 'Loading...', className, fullHeight = true }: LoadingProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gray-900/50 backdrop-blur-xl',
        fullHeight ? 'h-[calc(100vh-4rem)]' : 'h-full min-h-[400px]',
        className
      )}
    >
      <div className="text-center">
        <FontAwesomeIcon
          icon={faSpinner as IconProp}
          className="w-8 h-8 animate-spin text-blue-500 mb-4"
        />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
} 