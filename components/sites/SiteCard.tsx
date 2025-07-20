'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faGlobe,
  faCircle,
  faMicrochip,
  faCodeBranch,
  faEllipsisV,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ISite } from '@/model/site';
import { server } from '@/url';
import { useState } from 'react';

interface SiteCardProps {
  site: ISite;
  onDelete: (v: ISite) => void;
}

export default function SiteCard({ site, onDelete }: SiteCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const statusColor = {
    online: 'text-green-500',
    offline: 'text-gray-500',
    deploying: 'text-yellow-400',
  }[site.status];

  return (
    <div className="group relative w-[250px] h-[300px] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      {/* Dropdown Trigger */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="text-white hover:text-gray-300 p-1"
        >
          <FontAwesomeIcon icon={faEllipsisV as IconProp} />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-32 bg-zinc-800 rounded-md shadow-lg z-20 border border-white/10">
            <button
              onClick={() => {
                setShowDropdown(false);
                onDelete(site);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 rounded-t-md"
            >
              <FontAwesomeIcon icon={faTrash as IconProp} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="relative w-full aspect-video bg-zinc-800 flex items-center justify-center overflow-hidden">
        {site.deployDomain ? (
          <iframe
            src={site.deployDomain}
            className="w-full h-full border-none rounded-t-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
            <FontAwesomeIcon icon={faGlobe as IconProp} className="w-8 h-8" />
            <span className="text-xs">No Preview Available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-[calc(100%-130px)] space-y-4">
        <div className="space-y-2">
          <Link
            href={`${server}/projects/${site._id}`}
            className="block text-xl font-semibold text-white truncate hover:underline"
            title={site.title}
          >
            {site.title}
          </Link>

          {site.Pm2Name && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FontAwesomeIcon icon={faCodeBranch as IconProp} />
              <span className="truncate" title={site.Pm2Name}>
                {site.Pm2Name}
              </span>
            </div>
          )}

          {site.deployDomain && (
            <a
              href={site.deployDomain}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline mt-1"
            >
              <FontAwesomeIcon icon={faMicrochip as IconProp} />
              Deploy domain
            </a>
          )}
        </div>

        {/* Status & Time */}
        <div className="flex justify-between items-center text-sm text-gray-400 border-t border-white/10 pt-3">
          <div className="flex items-center gap-2 capitalize">
            <FontAwesomeIcon
              icon={faCircle as IconProp}
              className={cn('w-3 h-3', statusColor)}
            />
            <span>{site.status}</span>
          </div>
          <time dateTime={new Date(site.createdAt).toISOString()}>
            {formatDistanceToNow(new Date(site.createdAt), { addSuffix: true })}
          </time>
        </div>
      </div>
    </div>
  );
}
