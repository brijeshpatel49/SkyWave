import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiCode } from 'react-icons/fi';

const Footer = ({ isDark = true }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="relative mt-12 py-8 border-t border-white/10 dark:border-gray-600/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          {/* Technology Credits */}
          <div className={`flex flex-col md:flex-row items-center justify-center gap-4 text-sm mb-6 ${isDark ? 'text-white/70' : 'text-white/90'}`}>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiHeart className="text-red-500" />
              </motion.div>
              <span>using React + Tailwind CSS</span>
            </div>
            
            <div className="hidden md:block w-1 h-1 bg-current rounded-full opacity-50" />
            
            <div>
              <span>Weather data by </span>
              <motion.a 
                href="https://openweathermap.org" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="text-orange-400 hover:text-orange-300 transition-colors duration-200 font-medium underline decoration-orange-400/30 hover:decoration-orange-300/50"
              >
                OpenWeatherMap
              </motion.a>
            </div>
          </div>

          {/* GitHub Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-6"
          >
            <motion.a
              href="https://github.com/brijeshpatel49/SkyWave.git"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDark 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white' 
                  : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white'
              }`}
            >
              <FiGithub className="text-xl" />
              <span>View Source Code</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiCode className="text-lg" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={`text-xs ${isDark ? 'text-white/50' : 'text-white/70'}`}
          >
            © 2024 SkyWave. All rights reserved.
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${25 + i * 25}%`,
                top: `${40 + (i % 2) * 20}%`,
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;