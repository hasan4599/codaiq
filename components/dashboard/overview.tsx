import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { 
  faArrowTrendUp, 
  faGlobe, 
  faRocket, 
  faUsers 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const stats = [
  {
    label: "Total Websites",
    value: "12",
    change: "+3",
    icon: faGlobe,
    color: "text-blue-500",
  },
  {
    label: "Active Users",
    value: "1,234",
    change: "+22%",
    icon: faUsers,
    color: "text-green-500",
  },
  {
    label: "Components Used",
    value: "89",
    change: "+7",
    icon: faRocket,
    color: "text-purple-500",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, <span className="text-blue-500">User</span>
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your websites today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-800/50 bg-gray-900/50 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <FontAwesomeIcon 
                icon={stat.icon as IconProp} 
                className={`w-5 h-5 ${stat.color}`} 
              />
              <div className="flex items-center gap-1 text-sm">
                <FontAwesomeIcon 
                  icon={faArrowTrendUp as IconProp} 
                  className="w-3 h-3 text-green-500" 
                />
                <span className="text-green-500">{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-gray-800/50 bg-gray-900/50 p-6 backdrop-blur-xl">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b border-gray-800/50 pb-4 last:border-0"
            >
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FontAwesomeIcon 
                  icon={faRocket as IconProp} 
                  className="w-5 h-5 text-blue-500" 
                />
              </div>
              <div>
                <h4 className="font-medium">New website deployed</h4>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 