import { motion } from 'framer-motion';
import { WiDaySunny, WiCloudy } from 'react-icons/wi';

const LoadingSpinner = ({ message = "Loading weather data..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex flex-col items-center justify-center py-16"
    >
      {/* Glassmorphism container */}
      <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-600/30 rounded-3xl p-12 shadow-2xl">
        {/* Animated weather icons */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Cloud */}
          <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <WiCloudy className="text-6xl text-white/80" />
          </motion.div>
          
          {/* Rotating sun */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-2 right-2"
          >
            <WiDaySunny className="text-3xl text-yellow-400" />
          </motion.div>
          
          {/* Pulsing glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"
          />
        </div>

        {/* Loading text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-lg font-medium text-center"
        >
          {message}
        </motion.p>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-white/60 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;