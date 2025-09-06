import { motion } from "framer-motion";
import { WiRaindrop, WiThermometer } from "react-icons/wi";
import WeatherAnimations from "./WeatherAnimations";

const HourlyForecast = ({ hourlyData, isCelsius, isDark = true }) => {
  if (!hourlyData || !hourlyData.list) return null;

  const convertTemp = (temp) => {
    return isCelsius ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);
  };

  const formatHour = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const getRainChance = (item) => {
    // Calculate rain probability from weather data
    if (item.rain && item.rain["3h"]) {
      return Math.min(Math.round((item.rain["3h"] / 3) * 100), 100);
    }
    if (item.weather[0].main.toLowerCase().includes("rain")) {
      return Math.round(item.clouds.all * 0.8); // Estimate based on cloud coverage
    }
    if (item.weather[0].main.toLowerCase().includes("drizzle")) {
      return Math.round(item.clouds.all * 0.6);
    }
    if (item.weather[0].main.toLowerCase().includes("thunderstorm")) {
      return Math.round(item.clouds.all * 0.9);
    }
    return Math.round(item.clouds.all * 0.3); // Base chance from cloud coverage
  };

  // Get today's hourly data (next 8 hours)
  const todayHourly = hourlyData.list.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <div className={`relative backdrop-blur-2xl rounded-3xl p-6 shadow-2xl overflow-hidden ${
        isDark 
          ? 'bg-gray-800/20 border border-gray-600/30' 
          : 'bg-white/40 border border-white/50 shadow-lg'
      }`}>
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10"
          animate={{
            background: [
              "linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
              "linear-gradient(90deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1))",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`relative z-10 text-2xl font-bold mb-6 text-center ${
            isDark 
              ? 'bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent' 
              : 'text-gray-900'
          }`}
        >
          Hourly Forecast
        </motion.h3>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 relative z-10">
          {todayHourly.map((hour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.1,
                type: "spring",
                bounce: 0.3,
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className={`backdrop-blur-sm rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer group ${
                isDark 
                  ? 'bg-gray-700/20 border border-gray-600/30 hover:bg-gray-700/30' 
                  : 'bg-white/30 border border-white/40 hover:bg-white/40 shadow-md'
              }`}
            >
              {/* Time */}
              <p
                className={`font-semibold ${
                  isDark ? "text-white" : "text-gray-800"
                } mb-3 text-sm`}
              >
                {formatHour(hour.dt)}
              </p>

              {/* Weather Icon */}
              <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                <WeatherAnimations
                  condition={hour.weather[0].main}
                  iconCode={hour.weather[0].icon}
                  size="text-4xl"
                  isDark={isDark}
                />
              </div>

              {/* Temperature */}
              <div className="mb-3">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <WiThermometer
                    className={`text-lg ${
                      isDark ? "text-orange-400" : "text-orange-600"
                    }`}
                  />
                  <p
                    className={`text-lg font-bold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {convertTemp(hour.main.temp)}°
                  </p>
                </div>
                <p
                  className={`text-xs ${
                    isDark ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  Feels {convertTemp(hour.main.feels_like)}°
                </p>
              </div>

              {/* Rain Chance */}
              <div className="flex items-center justify-center gap-1">
                <WiRaindrop
                  className={`text-lg ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  {getRainChance(hour)}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll Layout */}
        <div className="md:hidden relative z-10">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {todayHourly.map((hour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className={`flex-shrink-0 w-24 backdrop-blur-sm rounded-2xl p-3 text-center ${
                  isDark 
                    ? 'bg-gray-700/20 border border-gray-600/30' 
                    : 'bg-white/30 border border-white/40 shadow-md'
                }`}
              >
                <p
                  className={`font-medium ${
                    isDark ? "text-white" : "text-gray-800"
                  } mb-2 text-xs`}
                >
                  {formatHour(hour.dt)}
                </p>

                <div className="mb-2">
                  <WeatherAnimations
                    condition={hour.weather[0].main}
                    iconCode={hour.weather[0].icon}
                    size="text-3xl"
                    isDark={isDark}
                  />
                </div>

                <p
                  className={`text-sm font-bold ${
                    isDark ? "text-white" : "text-gray-800"
                  } mb-1`}
                >
                  {convertTemp(hour.main.temp)}°
                </p>

                <div className="flex items-center justify-center gap-1">
                  <WiRaindrop
                    className={`text-sm ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <p
                    className={`text-xs ${
                      isDark ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    {getRainChance(hour)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${15 + i * 20}%`,
                top: `${25 + (i % 2) * 50}%`,
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast;
