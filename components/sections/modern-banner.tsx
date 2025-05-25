import { Palette, Puzzle, Trophy, Zap } from "lucide-react";

const ModernBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/20 to-pink-600/10"></div>

      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Effortless */}
          <div className="flex items-center justify-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full">
                <Puzzle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                Effortless
              </h3>
              <p className="text-gray-300 text-sm">Simple & Easy</p>
            </div>
          </div>

          {/* Lightning-fast */}
          <div className="flex items-center justify-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-full">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors duration-300">
                Lightning-fast
              </h3>
              <p className="text-gray-300 text-sm">Blazing Speed</p>
            </div>
          </div>

          {/* Custom */}
          <div className="flex items-center justify-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                <Palette className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                Custom
              </h3>
              <p className="text-gray-300 text-sm">Your Style</p>
            </div>
          </div>

          {/* Professional */}
          <div className="flex items-center justify-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-green-500 p-3 rounded-full">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                Professional
              </h3>
              <p className="text-gray-300 text-sm">Top Quality</p>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default ModernBanner;
