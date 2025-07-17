'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';

export const ActionButton = ({
  icon,
  label,
  color,
  onClick,
}: {
  icon: any;
  label: string;
  color?: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'px-3 py-1 rounded-md flex items-center gap-2 text-sm transition hover:opacity-80',
      color || 'bg-gray-700 text-white'
    )}
  >
    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
    {label}
  </button>
);
