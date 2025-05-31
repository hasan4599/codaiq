'use client';

import { Site } from '@prisma/client';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faGlobe,
  faCircle,
  faEllipsisVertical,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface SiteCardProps {
  site: Site;
  onEdit?: (site: Site) => void;
  onDelete?: (site: Site) => void;
}

export default function SiteCard({ site, onEdit, onDelete }: SiteCardProps) {
  const statusColor = {
    online: 'text-green-500',
    offline: 'text-gray-400',
    deploying: 'text-blue-500',
  }[site.status];

  return (
    <div className="group relative bg-gray-900/50 backdrop-blur-xl rounded-lg border border-gray-800/50 overflow-hidden hover:border-gray-700/50 transition-all duration-200">
      {/* Preview Image */}
      <Link href={`/dashboard/${site.id}`} className="block aspect-video w-full bg-gray-800/50 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <FontAwesomeIcon icon={faGlobe as IconProp} className="w-8 h-8" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg truncate">{site.name}</h3>
            {site.description && (
              <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                {site.description}
              </p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
              <FontAwesomeIcon
                icon={faEllipsisVertical as IconProp}
                className="w-4 h-4 text-gray-400"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(site)}>
                  <FontAwesomeIcon
                    icon={faPencil as IconProp}
                    className="w-4 h-4 mr-2"
                  />
                  Edit
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(site)}
                  className="text-red-500 focus:text-red-500"
                >
                  <FontAwesomeIcon
                    icon={faTrash as IconProp}
                    className="w-4 h-4 mr-2"
                  />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center text-gray-400">
            <FontAwesomeIcon
              icon={faCircle as IconProp}
              className={cn('w-2 h-2 mr-2', statusColor)}
            />
            <span className="capitalize">{site.status}</span>
          </div>
          <div className="text-gray-500">
            {formatDistanceToNow(new Date(site.createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
} 