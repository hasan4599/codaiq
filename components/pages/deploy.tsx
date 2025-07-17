import { ISite } from '@/model/site';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faServer,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';

export default function Deploy({ site }: { site: ISite }) {
  const deploys = site.deployHistory || [];

  const statusIcon = (status: 'success' | 'failed') =>
    status === 'success' ? (
      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
    ) : (
      <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
    );

  const envIcon = (env: 'dev' | 'prod') =>
    env === 'prod' ? (
      <FontAwesomeIcon icon={faServer} title="Production" />
    ) : (
      <FontAwesomeIcon icon={faCodeBranch} title="Development" />
    );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Deploy History</h2>
      {deploys.length === 0 ? (
        <p className="text-gray-400 text-sm">No deploys recorded yet.</p>
      ) : (
        <ul className="divide-y divide-gray-800 border border-gray-800 rounded-lg overflow-hidden">
          {deploys
            .slice()
            .sort((a, b) => b.date.getTime() - a.date.getTime()) // newest first
            .map(({ date, environment, status, deployedBy, commitHash, notes }, i) => (
              <li
                key={date.toISOString() + deployedBy + i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <span className="text-xl">{statusIcon(status)}</span>
                  <span className="text-xl">{envIcon(environment)}</span>
                  <div>
                    <p className="font-medium text-white">
                      Deployed by {deployedBy}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formatDistanceToNow(date, { addSuffix: true })}
                      {commitHash && (
                        <>
                          {' '}
                          • Commit: <code className="font-mono">{commitHash.slice(0, 7)}</code>
                        </>
                      )}
                    </p>
                    {notes && (
                      <p className="text-gray-400 text-sm italic mt-1">{notes}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
