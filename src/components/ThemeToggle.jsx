import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="relative p-4 bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-2xl text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-500/20 rounded-2xl blur-lg"
        animate={{
          opacity: isDark ? 0.3 : 0.5,
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Icon container */}
      <motion.div
        className="relative z-10"
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: isDark ? 1.1 : 1
        }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      >
        {isDark ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiSun className="w-6 h-6 text-yellow-400 drop-shadow-sm" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiMoon className="w-6 h-6 text-indigo-900 drop-shadow-sm" />
          </motion.div>
        )}
      </motion.div>

      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          background: isDark 
            ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
            : 'linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-blue-400/40' : 'bg-yellow-400/40'
            }`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [-5, 5, -5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.button>
  );
};

export default ThemeToggle;