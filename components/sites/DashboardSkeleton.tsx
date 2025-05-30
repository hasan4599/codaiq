export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-800/50 bg-gray-900/50 backdrop-blur-xl overflow-hidden animate-pulse"
        >
          {/* Thumbnail Skeleton */}
          <div className="aspect-video bg-gray-800/50" />

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-800/50 rounded w-2/3" />
            <div className="h-4 bg-gray-800/50 rounded w-1/2" />
            <div className="h-4 bg-gray-800/50 rounded w-1/4 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
} 