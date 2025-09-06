import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, onLocationSearch, loading, isDark = true }) => {
  const [city, setCity] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mb-12"
    >
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
          animate={{
            opacity: isFocused ? 0.6 : 0.3,
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative">
          <motion.input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for any city worldwide..."
            className={`w-full px-6 py-4 pl-14 pr-32 text-lg backdrop-blur-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 ${
              isDark 
                ? 'text-white bg-gray-800/30 border border-gray-600/30 placeholder-gray-400' 
                : 'text-gray-900 bg-white/40 border border-white/50 placeholder-gray-700 shadow-lg'
            }`}
            disabled={loading}
            whileFocus={{ scale: 1.01 }}
          />
          
          {/* Search icon */}
          <motion.div
            className="absolute left-5 top-0 bottom-0 flex items-center justify-center w-6 h-full"
            animate={{
              scale: isFocused ? 1.1 : 1,
            }}
          >
            <FiSearch className={`w-6 h-6 transition-colors duration-200 ${
              isFocused 
                ? (isDark ? 'text-blue-400' : 'text-blue-600')
                : (isDark ? 'text-gray-400' : 'text-gray-700')
            }`} />
          </motion.div>
        </div>
        
        {/* Action buttons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
          {/* Location button */}
          <motion.button
            type="button"
            onClick={onLocationSearch}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl transition-all duration-200 disabled:opacity-50 ${
              isDark 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/30' 
                : 'text-gray-800 hover:text-blue-600 hover:bg-white/30'
            }`}
            title="Use current location"
          >
            <FiMapPin className="w-5 h-5" />
          </motion.button>
          
          {/* Search button */}
          <motion.button
            type="submit"
            disabled={loading || !city.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Search'
            )}
          </motion.button>
        </div>

        {/* Floating particles */}
        {isFocused && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: '20%',
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default SearchBar;