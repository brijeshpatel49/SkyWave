import { motion } from 'framer-motion';
import { WiUmbrella, WiRefresh } from 'react-icons/wi';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      className="max-w-md mx-auto mb-8"
    >
      <div className="bg-red-500/10 dark:bg-red-900/20 backdrop-blur-xl border border-red-500/20 dark:border-red-400/30 rounded-2xl p-8 shadow-xl">
        {/* Animated broken umbrella */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ 
              rotate: [-5, 5, -5],
              y: [0, -2, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            <WiUmbrella className="text-6xl text-red-400" />
            
            {/* Crack effect */}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 text-6xl text-yellow-300"
            >
              ⚡
            </motion.div>
          </motion.div>
        </div>

        {/* Error icon and message */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <FiAlertCircle className="text-red-400 text-2xl mr-2" />
            <h3 className="text-xl font-semibold text-red-100">Oops!</h3>
          </div>
          
          <p className="text-red-200 mb-6 leading-relaxed">
            {message || "Something went wrong while fetching the weather data."}
          </p>

          {/* Retry button */}
          {onRetry && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="inline-flex items-center px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl text-red-100 font-medium transition-all duration-200 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <WiRefresh className="text-xl" />
              </motion.div>
              Try Again
            </motion.button>
          )}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
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

export default ErrorMessage;