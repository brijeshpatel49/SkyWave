import { motion } from 'framer-motion';
import { 
  WiDaySunny, 
  WiRain, 
  WiCloudy, 
  WiSnow, 
  WiThunderstorm,
  WiFog,
  WiNightClear
} from 'react-icons/wi';

const WeatherAnimations = ({ condition, iconCode, size = "text-8xl", className = "", isDark = true }) => {
  const getAnimatedIcon = () => {
    const baseClasses = `${size} ${className}`;
    
    // Theme-aware colors
    const getThemeColor = (lightColor, darkColor) => isDark ? darkColor : lightColor;
    
    switch (condition?.toLowerCase()) {
      case 'clear':
        return iconCode?.includes('n') ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative flex items-center justify-center"
          >
            <WiNightClear className={`${baseClasses} ${getThemeColor('text-indigo-600', 'text-blue-300')}`} />
            {/* Night glow effect */}
            <motion.div
              className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        ) : (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="relative flex items-center justify-center"
          >
            <WiDaySunny className={`${baseClasses} ${getThemeColor('text-amber-600', 'text-yellow-400')}`} />
            
            {/* Multiple glow layers for sun effect */}
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-amber-400/30', 'bg-yellow-400/25')} rounded-full blur-2xl`}
              animate={{ 
                scale: [1, 1.4, 1.2, 1], 
                opacity: [0.4, 0.8, 0.6, 0.4] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-orange-400/25', 'bg-yellow-300/20')} rounded-full blur-xl`}
              animate={{ 
                scale: [1.2, 1.6, 1.3, 1.2], 
                opacity: [0.3, 0.6, 0.4, 0.3] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-yellow-300/20', 'bg-yellow-200/15')} rounded-full blur-3xl`}
              animate={{ 
                scale: [1.4, 1.8, 1.5, 1.4], 
                opacity: [0.2, 0.4, 0.3, 0.2] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Subtle rotating shimmer effect */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <div className="relative w-full h-full">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-0.5 h-0.5 ${getThemeColor('bg-amber-300', 'bg-yellow-200')} rounded-full`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-35px) translateX(-50%)`,
                      transformOrigin: '50% 35px',
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.25,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 'rain':
      case 'drizzle':
        return (
          <div className="relative flex items-center justify-center">
            <WiRain className={`${baseClasses} ${getThemeColor('text-blue-700', 'text-blue-400')}`} />
            {/* Rain drops animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-0.5 h-6 ${getThemeColor('bg-blue-600', 'bg-blue-300')} rounded-full opacity-80`}
                  style={{
                    left: `${25 + i * 8}%`,
                    top: '15%',
                  }}
                  animate={{
                    y: [0, 50, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            {/* Rain glow effect */}
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-blue-500/15', 'bg-blue-400/20')} rounded-full blur-xl`}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        );

      case 'clouds':
        return (
          <motion.div
            animate={{ x: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            <WiCloudy className={`${baseClasses} ${getThemeColor('text-slate-700', 'text-gray-300')}`} />
            {/* Cloud shadow effect */}
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-slate-400/20', 'bg-gray-400/20')} rounded-full blur-lg`}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        );

      case 'snow':
        return (
          <div className="relative flex items-center justify-center">
            <WiSnow className={`${baseClasses} ${getThemeColor('text-sky-600', 'text-blue-200')}`} />
            {/* Snowflakes animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute text-sm ${getThemeColor('text-sky-500', 'text-white')}`}
                  style={{
                    left: `${15 + i * 8}%`,
                    top: '10%',
                  }}
                  animate={{
                    y: [0, 60, 0],
                    x: [-3, 3, -3],
                    rotate: [0, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                >
                  ❄
                </motion.div>
              ))}
            </div>
            {/* Snow glow effect */}
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-sky-400/15', 'bg-blue-300/20')} rounded-full blur-xl`}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        );

      case 'thunderstorm':
        return (
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ 
                filter: ['brightness(1)', 'brightness(1.8)', 'brightness(1)'],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.5 }}
            >
              <WiThunderstorm className={`${baseClasses} ${getThemeColor('text-purple-700', 'text-purple-400')}`} />
            </motion.div>
            {/* Lightning effect */}
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-yellow-400/30', 'bg-yellow-300/40')} rounded-full opacity-0`}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
            />
            {/* Thunder glow */}
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-purple-500/20', 'bg-purple-400/30')} rounded-full blur-xl`}
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
        );

      case 'mist':
      case 'fog':
        return (
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            <WiFog className={`${baseClasses} ${getThemeColor('text-slate-600', 'text-gray-400')}`} />
            {/* Mist effect */}
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-slate-300/25', 'bg-gray-400/30')} rounded-full blur-2xl`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        );

      default:
        return (
          <div className="relative flex items-center justify-center">
            <WiDaySunny className={`${baseClasses} ${getThemeColor('text-amber-600', 'text-yellow-400')}`} />
            <motion.div
              className={`absolute inset-0 ${getThemeColor('bg-amber-400/20', 'bg-yellow-400/20')} rounded-full blur-xl`}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="flex items-center justify-center"
    >
      {getAnimatedIcon()}
    </motion.div>
  );
};

export default WeatherAnimations;