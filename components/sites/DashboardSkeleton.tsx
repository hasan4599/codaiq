import { Card } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden border-gray-800/50 bg-gray-900/50 backdrop-blur-xl">
          <div className="aspect-video bg-gray-800/50 animate-pulse" />
          <div className="p-4">
            <div className="h-6 w-3/4 bg-gray-800/50 rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-gray-800/50 rounded animate-pulse mb-4" />
            <div className="flex justify-end">
              <div className="h-9 w-24 bg-gray-800/50 rounded animate-pulse" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 