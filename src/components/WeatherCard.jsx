import { useState } from 'react';
import { 
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
  WiBarometer
} from 'react-icons/wi';
import { motion } from 'framer-motion';
import WeatherAnimations from './WeatherAnimations';

const WeatherCard = ({ weather, isCelsius, onToggleUnit, isDark = true }) => {
  if (!weather) return null;



  const convertTemp = (temp) => {
    return isCelsius ? Math.round(temp) : Math.round((temp * 9/5) + 32);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
    };
  };

  const { date, time } = getCurrentDateTime();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Main Weather Card */}
      <div className={`relative backdrop-blur-2xl rounded-3xl p-8 mb-8 shadow-2xl overflow-hidden ${
        isDark 
          ? 'bg-gray-800/20 border border-gray-600/30' 
          : 'bg-white/40 border border-white/50 shadow-lg'
      }`}>
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
              'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))',
              'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header with Date, Time, and Location */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center mb-8"
        >
          <div className="mb-4">
            <p className={`text-xl font-semibold mb-1 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{date}</p>
            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>{time}</p>
          </div>
          
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
            className={`text-4xl md:text-5xl font-bold mb-2 ${
              isDark 
                ? 'bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent' 
                : 'text-gray-900'
            }`}
          >
            {weather.name}, {weather.sys.country}
          </motion.h1>
        </motion.div>

        {/* Main Weather Display */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 mb-8">
          {/* Weather Icon and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center"
          >
            <WeatherAnimations 
              condition={weather.weather[0].main}
              iconCode={weather.weather[0].icon}
              size="text-8xl"
              className="mb-4"
              isDark={isDark}
            />
            <p className={`text-2xl font-medium capitalize text-center ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
              {weather.weather[0].description}
            </p>
          </motion.div>

          {/* Temperature Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
                className={`text-7xl md:text-8xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {convertTemp(weather.main.temp)}°
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleUnit}
                className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium backdrop-blur-sm border ${
                  isDark 
                    ? 'bg-white/20 hover:bg-white/30 border-white/30 text-white' 
                    : 'bg-gray-800/20 hover:bg-gray-800/30 border-gray-800/30 text-gray-800'
                }`}
              >
                {isCelsius ? '°C' : '°F'}
              </motion.button>
            </div>
            <p className={`text-xl ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              Feels like {convertTemp(weather.main.feels_like)}°{isCelsius ? 'C' : 'F'}
            </p>
          </motion.div>
        </div>

        {/* Weather Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { 
              icon: WiHumidity, 
              label: 'Humidity', 
              value: `${weather.main.humidity}%`, 
              color: isDark ? 'text-blue-400' : 'text-blue-600',
              bgColor: isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'
            },
            { 
              icon: WiStrongWind, 
              label: 'Wind Speed', 
              value: `${weather.wind.speed} m/s`, 
              color: isDark ? 'text-emerald-400' : 'text-emerald-600',
              bgColor: isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/20'
            },
            { 
              icon: WiBarometer, 
              label: 'Pressure', 
              value: `${weather.main.pressure} hPa`, 
              color: isDark ? 'text-violet-400' : 'text-violet-600',
              bgColor: isDark ? 'bg-violet-500/10' : 'bg-violet-500/20'
            },
            { 
              icon: WiSunrise, 
              label: 'Sunrise', 
              value: formatTime(weather.sys.sunrise), 
              color: isDark ? 'text-amber-400' : 'text-orange-600',
              bgColor: isDark ? 'bg-amber-500/10' : 'bg-orange-500/20'
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                isDark 
                  ? 'bg-gray-700/20 border border-gray-600/30 hover:bg-gray-700/30' 
                  : 'bg-white/30 border border-white/40 hover:bg-white/40 shadow-md'
              }`}
            >
              {/* Icon background glow */}
              <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 ${item.bgColor} rounded-full blur-lg opacity-50`} />
              
              <div className="relative z-10">
                <item.icon className={`text-4xl ${item.color} mx-auto mb-3 drop-shadow-sm`} />
                <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'} mb-1 font-medium`}>{item.label}</p>
                <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;