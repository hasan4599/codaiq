'use client';

import { ISite } from '@/model/site';
import { formatDistanceToNow } from 'date-fns';
import {
  faStop,
  faPlay,
  faHammer,
  faCloudUploadAlt,
  faTrash,
  faServer,
  faTerminal,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { ActionButton } from './action_buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { server } from '@/url';
import { Fetch } from '@/hooks/fetch';
import { toast } from 'sonner';

export function Overview({ site }: { site: ISite }) {
  const statusColor = {
    online: 'text-green-400 bg-green-800/20',
    offline: 'text-gray-400 bg-gray-800/40',
    deploying: 'text-blue-400 bg-blue-800/20',
  }[site.status];

  const InfoItem = ({
    label,
    value,
    isLink,
  }: {
    label: string;
    value?: string | number;
    isLink?: boolean;
  }) => (
    <div>
      <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </h4>
      {value ? (
        isLink ? (
          <a
            href={value.toString()}
            className="text-sm text-blue-400 break-all hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-gray-200 break-all">{value}</p>
        )
      ) : (
        <p className="text-sm text-gray-500 italic">Not set</p>
      )}
    </div>
  );


  const handlePM2Start = async () => {
    const res: string | null = await Fetch({
      body: { id: site._id },
      method: 'POST',
      host: 'server',
      api: 'post/pm2/dev/start',
      loading: (v) => { }
    });
    if (res) toast.success(res);
    else toast.error('Failed to start dev server');
  }

  const handlePM2Stop = async () => {
    const res: string | null = await Fetch({
      body: { id: site._id },
      method: 'POST',
      host: 'server',
      api: 'post/pm2/dev/stop',
      loading: (v) => { }
    });
    if (res) toast.success(res);
    else toast.error('Failed to stop dev server');
  }
  return (
    <div className="space-y-10">
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Project Overview</h2>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}
        >
          {site.status.toUpperCase()}
        </span>
      </div>

      {/* Metadata Section */}
      <div className="grid md:grid-cols-2 gap-6 bg-gray-900/60 p-6 rounded-xl border border-gray-800 backdrop-blur-lg shadow-lg">
        <InfoItem label="Description" value={site.metadata.description} />
        <InfoItem label="Keywords" value={site.metadata.keywords.join(', ')} />
        <InfoItem
          label="Authors"
          value={
            site.metadata.authors?.map((a) => a.name).join(', ') ?? 'None'
          }
        />
        <InfoItem label="Repository" value={site.repoURL} isLink />
      </div>

      {/* URL & Port Info */}
      <div className="grid md:grid-cols-2 gap-6 bg-gray-900/60 p-6 rounded-xl border border-gray-800 backdrop-blur-lg">
        <InfoItem label="Dev Tunnel URL" value={site.devTunnelUrl} isLink />
        <InfoItem label="Prod Tunnel URL" value={site.prodTunnelUrl} isLink />
        <InfoItem label="Deploy Domain" value={site.deployDomain} isLink />
        <InfoItem label="Dev Port" value={site.devPort} />
        <InfoItem label="Prod Port" value={site.prodPort} />
        <InfoItem label="Dev PM2 Name" value={site.devPm2Name} />
        <InfoItem label="Prod PM2 Name" value={site.prodPm2Name} />
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
          Project Actions
        </h3>
        <div className="space-y-6">
          {/* Dev Mode Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
              Dev Environment
            </h3>
            <div className="flex flex-wrap gap-3">
              <ActionButton
                icon={faPlay}
                label="Start Dev"
                color="bg-green-700"
                onClick={handlePM2Start}
              />
              <ActionButton
                icon={faStop}
                label="Stop Dev"
                color="bg-red-700"
                onClick={handlePM2Stop}
              />
              <ActionButton
                icon={faTerminal}
                label="Open Dev URL"
                color="bg-gray-700"
                onClick={() => window.location.href = `${server}/dev/${site._id}`}
              />
            </div>
          </div>

          {/* Prod Mode Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
              Production Environment
            </h3>
            <div className="flex flex-wrap gap-3">
              <ActionButton icon={faPlay} label="Restart" color="bg-yellow-600" />
              <ActionButton icon={faHammer} label="Build" color="bg-blue-600" />
              <ActionButton
                icon={faCloudUploadAlt}
                label="Deploy"
                color="bg-green-600"
              />
              <ActionButton icon={faStop} label="Stop" color="bg-red-600" />
              <ActionButton
                icon={faTrash}
                label="Delete"
                color="bg-gray-700 text-red-400"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 pt-4 text-sm text-gray-500">
        Project created{' '}
        <span className="text-gray-300 font-medium">
          {formatDistanceToNow(new Date(site.createdAt), { addSuffix: true })}
        </span>{' '}
        • Last updated{' '}
        <span className="text-gray-300 font-medium">
          {formatDistanceToNow(new Date(site.updatedAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}
