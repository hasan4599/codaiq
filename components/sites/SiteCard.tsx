'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faGlobe,
  faCircle,
  faCodeBranch,
  faMicrochip,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ISite } from '@/model/site';
import { server } from '@/url';

interface SiteCardProps {
  site: ISite;
}

export default function SiteCard({ site }: SiteCardProps) {
  const statusColor = {
    online: 'text-green-500',
    offline: 'text-gray-400',
    deploying: 'text-blue-500',
  }[site.status];

  const authors = site.metadata.authors ?? [];

  return (
    <div className="group relative bg-gray-900/60 backdrop-blur-lg rounded-md border border-gray-800/60 overflow-hidden hover:border-gray-700/70 transition duration-200 w-[350px] h-[450px]">
      {/* Preview Block */}
      <div className="aspect-video w-full bg-gray-800/60">
        {site.devTunnelUrl ? (
          <iframe
            src={site.devTunnelUrl}
            className="w-full h-full border-none rounded-t-md"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <FontAwesomeIcon icon={faGlobe as IconProp} className="w-6 h-6" />
          </div>
        )}
      </div>


      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <h3
          title={site.metadata.title}
          className="text-white text-lg font-semibold truncate"
        >
          {site.metadata.title}
        </h3>

        {/* Description */}
        {site.metadata.description && (
          <p
            title={site.metadata.description}
            className="text-gray-400 text-sm line-clamp-2"
          >
            {site.metadata.description}
          </p>
        )}

        {/* Links (Dev/Prod Preview) */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-2">
          {site.repoURL && (
            <Link
              href={site.repoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-400 transition"
              title="Repository URL"
            >
              <FontAwesomeIcon icon={faCodeBranch as IconProp} />
              Repo
            </Link>
          )}
          {site.devTunnelUrl && (
            <a
              href={`${server}/dev/${site._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-400 transition"
              title="Dev Preview"
            >
              <FontAwesomeIcon icon={faMicrochip as IconProp} />
              Dev Preview
            </a>
          )}
          {site.prodTunnelUrl && (
            <a
              href={site.prodTunnelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-green-400 transition"
              title="Prod Preview"
            >
              <FontAwesomeIcon icon={faRocket as IconProp} />
              Prod Preview
            </a>
          )}
        </div>

        {/* Dev info badges */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-300 mt-2">
          {site.devPort && (
            <span className="inline-flex items-center gap-1 bg-gray-700 px-2 py-0.5 rounded-full">
              <FontAwesomeIcon icon={faMicrochip as IconProp} className="w-3 h-3" />
              Dev Port: {site.devPort}
            </span>
          )}
          {site.devPm2Name && (
            <span className="inline-flex items-center gap-1 bg-gray-700 px-2 py-0.5 rounded-full">
              <FontAwesomeIcon icon={faCodeBranch as IconProp} className="w-3 h-3" />
              PM2: {site.devPm2Name}
            </span>
          )}
        </div>

        {/* Authors */}
        {authors.length > 0 && (
          <div className="text-gray-400 text-xs mt-2">
            <strong>Author{authors.length > 1 ? 's' : ''}: </strong>
            {authors.map((a, i) => (
              <a
                key={a.url + i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                title={a.name}
              >
                {a.name}
                {i < authors.length - 1 ? ', ' : ''}
              </a>
            ))}
          </div>
        )}

        {/* Footer: Status + CreatedAt */}
        <div className="flex justify-between items-center pt-3 text-xs text-gray-400 border-t border-gray-800 mt-2">
          <div className="flex items-center gap-1 capitalize">
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
