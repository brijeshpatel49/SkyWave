import { motion } from 'framer-motion';
import WeatherAnimations from './WeatherAnimations';

const Forecast = ({ forecast, isCelsius, isDark = true }) => {
  if (!forecast || !forecast.list) return null;



  const convertTemp = (temp) => {
    return isCelsius ? Math.round(temp) : Math.round((temp * 9/5) + 32);
  };

  // Group forecast by day and get daily data
  const getDailyForecast = () => {
    const dailyData = {};
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = {
          date: date,
          temps: [],
          weather: item.weather[0],
          items: []
        };
      }
      
      dailyData[dayKey].temps.push(item.main.temp);
      dailyData[dayKey].items.push(item);
    });

    // Convert to array and get first 5 days
    return Object.values(dailyData).slice(0, 5).map(day => ({
      date: day.date,
      weather: day.weather,
      minTemp: Math.min(...day.temps),
      maxTemp: Math.max(...day.temps),
      // Use the most common weather condition for the day
      icon: day.items[Math.floor(day.items.length / 2)].weather[0].icon
    }));
  };

  const dailyForecast = getDailyForecast();

  const formatDay = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className={`relative backdrop-blur-2xl rounded-3xl p-8 shadow-2xl overflow-hidden ${
        isDark 
          ? 'bg-gray-800/20 border border-gray-600/30' 
          : 'bg-white/40 border border-white/50 shadow-lg'
      }`}>
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10"
          animate={{
            background: [
              'linear-gradient(90deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1), rgba(20, 184, 166, 0.1))',
              'linear-gradient(90deg, rgba(20, 184, 166, 0.1), rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))',
              'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(20, 184, 166, 0.1), rgba(147, 51, 234, 0.1))',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`relative z-10 text-3xl font-bold mb-8 text-center ${
            isDark 
              ? 'bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent' 
              : 'text-gray-900'
          }`}
        >
          5-Day Forecast
        </motion.h2>
        
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-4 relative z-10">
          {dailyForecast.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + index * 0.1,
                type: "spring",
                bounce: 0.3
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className={`backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer group ${
                isDark 
                  ? 'bg-gray-700/20 border border-gray-600/30 hover:bg-gray-700/30' 
                  : 'bg-white/30 border border-white/40 hover:bg-white/40 shadow-md'
              }`}
            >
              {/* Day */}
              <p className={`font-bold mb-2 text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formatDay(day.date)}
              </p>
              
              {/* Weather Icon */}
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <WeatherAnimations 
                  condition={day.weather.main}
                  iconCode={day.icon}
                  size="text-5xl"
                  isDark={isDark}
                />
              </div>
              
              {/* Description */}
              <p className={`text-sm mb-4 capitalize leading-tight ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                {day.weather.description}
              </p>
              
              {/* Temperature Range */}
              <div className="space-y-1">
                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {convertTemp(day.maxTemp)}°
                </p>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  {convertTemp(day.minTemp)}°
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll Layout */}
        <div className="md:hidden relative z-10">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {dailyForecast.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`flex-shrink-0 w-32 backdrop-blur-sm rounded-2xl p-4 text-center ${
                  isDark 
                    ? 'bg-gray-700/20 border border-gray-600/30' 
                    : 'bg-white/30 border border-white/40 shadow-md'
                }`}
              >
                <p className={`font-semibold mb-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatDay(day.date)}
                </p>
                
                <div className="mb-3">
                  <WeatherAnimations 
                    condition={day.weather.main}
                    iconCode={day.icon}
                    size="text-4xl"
                    isDark={isDark}
                  />
                </div>
                
                <div className="space-y-1">
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {convertTemp(day.maxTemp)}°
                  </p>
                  <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    {convertTemp(day.minTemp)}°
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Forecast;