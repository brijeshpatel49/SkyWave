import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import RefreshButton from "./components/RefreshButton";
import Footer from "./components/Footer";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getForecast,
  getForecastByCoords,
  getHourlyForecast,
  getHourlyForecastByCoords,
} from "./utils/api";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [isCelsius, setIsCelsius] = useState(() => {
    const saved = localStorage.getItem("temperatureUnit");
    return saved ? saved === "celsius" : true;
  });

  // Update document title when weather changes
  useEffect(() => {
    if (weather) {
      document.title = `Weather in ${weather.name} - ${Math.round(
        weather.main.temp
      )}°${isCelsius ? "C" : "F"} | SkyWave`;
    } else {
      document.title = "SkyWave - Beautiful Weather Experience";
    }
  }, [weather, isCelsius]);

  // Theme management
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Temperature unit management
  useEffect(() => {
    localStorage.setItem(
      "temperatureUnit",
      isCelsius ? "celsius" : "fahrenheit"
    );
  }, [isCelsius]);

  // Auto-detect location on first load or load last searched location
  useEffect(() => {
    const lastSearchedCity = localStorage.getItem("lastSearchedCity");
    const lastSearchedCoords = localStorage.getItem("lastSearchedCoords");

    if (lastSearchedCity) {
      // Load last searched city
      handleSearch(lastSearchedCity);
    } else if (lastSearchedCoords) {
      // Load last searched coordinates
      const coords = JSON.parse(lastSearchedCoords);
      handleLocationSearchByCoords(coords.lat, coords.lon);
    } else {
      // First time user - detect location
      handleLocationSearch();
    }
  }, []);

  const getWeatherBackground = () => {
    if (!weather) {
      return isDark
        ? "from-slate-900 via-purple-900 to-slate-900"
        : "from-sky-300 via-blue-400 to-indigo-500";
    }

    const condition = weather.weather[0].main.toLowerCase();
    const isNight = weather.weather[0].icon.includes("n");

    if (isDark) {
      switch (condition) {
        case "clear":
          return isNight
            ? "from-indigo-900 via-purple-900 to-pink-900"
            : "from-orange-900 via-amber-900 to-yellow-900";
        case "clouds":
          return "from-slate-900 via-gray-800 to-slate-900";
        case "rain":
        case "drizzle":
          return "from-blue-900 via-indigo-900 to-purple-900";
        case "thunderstorm":
          return "from-gray-900 via-purple-900 to-black";
        case "snow":
          return "from-blue-900 via-cyan-900 to-slate-900";
        default:
          return "from-slate-900 via-purple-900 to-slate-900";
      }
    } else {
      switch (condition) {
        case "clear":
          return isNight
            ? "from-indigo-500 via-purple-500 to-pink-500"
            : "from-amber-300 via-orange-400 to-red-400";
        case "clouds":
          return "from-slate-300 via-gray-400 to-slate-500";
        case "rain":
        case "drizzle":
          return "from-blue-500 via-blue-600 to-indigo-700";
        case "thunderstorm":
          return "from-slate-600 via-gray-700 to-slate-800";
        case "snow":
          return "from-sky-200 via-cyan-300 to-blue-300";
        default:
          return "from-sky-300 via-blue-400 to-indigo-500";
      }
    }
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");

    try {
      const [weatherData, forecastData, hourlyData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
        getHourlyForecast(city),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(hourlyData);

      // Save last searched city to localStorage
      localStorage.setItem("lastSearchedCity", city);
      localStorage.removeItem("lastSearchedCoords"); // Clear coords when searching by city
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
      setHourlyForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          await handleLocationSearchByCoords(latitude, longitude);

          // Save coordinates to localStorage
          localStorage.setItem(
            "lastSearchedCoords",
            JSON.stringify({ lat: latitude, lon: longitude })
          );
          localStorage.removeItem("lastSearchedCity"); // Clear city when using location
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  const handleLocationSearchByCoords = async (latitude, longitude) => {
    try {
      const [weatherData, forecastData, hourlyData] = await Promise.all([
        getCurrentWeatherByCoords(latitude, longitude),
        getForecastByCoords(latitude, longitude),
        getHourlyForecastByCoords(latitude, longitude),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(hourlyData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
      setHourlyForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleRefresh = () => {
    if (weather) {
      handleSearch(weather.name);
    } else {
      handleLocationSearch();
    }
  };

  const handleRetry = () => {
    setError("");
    handleLocationSearch();
  };

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${getWeatherBackground()}`}
      animate={{
        background: `linear-gradient(135deg, ${getWeatherBackground()
          .replace("from-", "")
          .replace("to-", "")
          .replace("via-", "")})`,
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Animated overlay */}
      <motion.div
        className={`min-h-screen backdrop-blur-[1px] ${
          isDark ? "bg-black/40" : "bg-black/10"
        }`}
        animate={{
          backgroundColor: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.8 }}
      >
        {/* Navigation */}
        <Navigation isDark={isDark} onToggleTheme={toggleTheme} />

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-8">
          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            loading={loading}
            isDark={isDark}
          />

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {loading && <LoadingSpinner key="loading" />}

            {error && (
              <ErrorMessage key="error" message={error} onRetry={handleRetry} />
            )}

            {weather && !loading && (
              <motion.div
                key="weather"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <WeatherCard
                  weather={weather}
                  isCelsius={isCelsius}
                  onToggleUnit={toggleTemperatureUnit}
                  isDark={isDark}
                />

                {hourlyForecast && (
                  <HourlyForecast
                    hourlyData={hourlyForecast}
                    isCelsius={isCelsius}
                    isDark={isDark}
                  />
                )}

                {forecast && (
                  <Forecast
                    forecast={forecast}
                    isCelsius={isCelsius}
                    isDark={isDark}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Message */}
          {!weather && !loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div
                className={`backdrop-blur-2xl rounded-3xl p-12 max-w-2xl mx-auto shadow-2xl ${
                  isDark
                    ? "bg-gray-800/20 border border-gray-600/30"
                    : "bg-white/40 border border-white/50 shadow-lg"
                }`}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-6xl mb-6"
                >
                  🌤️
                </motion.div>
                <h2
                  className={`text-3xl font-bold mb-4 ${
                    isDark
                      ? "bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                      : "text-gray-900"
                  }`}
                >
                  Welcome to SkyWave
                </h2>
                <p
                  className={`text-lg leading-relaxed ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  Discover beautiful weather experiences with stunning
                  animations and detailed forecasts. Search for any city
                  worldwide or use your current location to get started!
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <Footer isDark={isDark} />

        {/* Refresh Button */}
        <RefreshButton onRefresh={handleRefresh} loading={loading} />

        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
