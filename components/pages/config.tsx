'use client';

import { ISite } from '@/model/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCodeBranch,
  faServer,
  faLaptopCode,
  faGlobe,
  faUser,
  faTags,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';

export function Config({ site }: { site: ISite }) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
        Project Configuration
      </h2>

      {/* Metadata */}
      <section className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-300">
          <FontAwesomeIcon icon={faFileLines} className="text-blue-400" />
          Metadata
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-400">
          <dt className="font-medium text-gray-300">Title</dt>
          <dd>{site.metadata.title}</dd>

          <dt className="font-medium text-gray-300">Description</dt>
          <dd>{site.metadata.description}</dd>

          <dt className="font-medium text-gray-300">Keywords</dt>
          <dd className="italic">{site.metadata.keywords.join(', ')}</dd>

          <dt className="font-medium text-gray-300">Authors</dt>
          <dd>
            {(site.metadata.authors ?? []).map((a, i) => (
              <a
                key={a.url + i}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mr-3 mb-1 rounded px-2 py-1 bg-gray-800 hover:bg-blue-700 transition text-blue-400 text-sm"
              >
                {a.name}
              </a>
            ))}
          </dd>
        </dl>
      </section>

      {/* Repository URL */}
      <section className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-300">
          <FontAwesomeIcon icon={faCodeBranch} className="text-green-400" />
          Repository
        </h3>
        <a
          href={site.repoURL}
          target="_blank"
          rel="noreferrer"
          className="block text-blue-400 hover:underline break-all select-all"
          title={site.repoURL}
        >
          {site.repoURL}
        </a>
      </section>

      {/* Development Environment */}
      <section className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-300">
          <FontAwesomeIcon icon={faLaptopCode} className="text-yellow-400" />
          Development Environment
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-400">
          <dt className="font-medium text-gray-300">Port</dt>
          <dd>{site.devPort ?? 'N/A'}</dd>

          <dt className="font-medium text-gray-300">PM2 Process Name</dt>
          <dd>{site.devPm2Name ?? 'N/A'}</dd>

          <dt className="font-medium text-gray-300">Tunnel URL</dt>
          <dd>
            {site.devTunnelUrl ? (
              <a
                href={site.devTunnelUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline break-all"
                title={site.devTunnelUrl}
              >
                {site.devTunnelUrl}
              </a>
            ) : (
              'N/A'
            )}
          </dd>
        </dl>
      </section>

      {/* Production Environment */}
      <section className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-300">
          <FontAwesomeIcon icon={faServer} className="text-red-400" />
          Production Environment
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-400">
          <dt className="font-medium text-gray-300">Port</dt>
          <dd>{site.prodPort ?? 'N/A'}</dd>

          <dt className="font-medium text-gray-300">PM2 Process Name</dt>
          <dd>{site.prodPm2Name ?? 'N/A'}</dd>

          <dt className="font-medium text-gray-300">Tunnel URL</dt>
          <dd>
            {site.prodTunnelUrl ? (
              <a
                href={site.prodTunnelUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline break-all"
                title={site.prodTunnelUrl}
              >
                {site.prodTunnelUrl}
              </a>
            ) : (
              'N/A'
            )}
          </dd>

          <dt className="font-medium text-gray-300">Deployment Domain</dt>
          <dd>{site.deployDomain ?? 'Not set'}</dd>
        </dl>
      </section>
    </div>
  );
}
