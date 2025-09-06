# SkyWave 🌤️

A stunning, responsive weather application built with modern web technologies. Experience beautiful weather animations, detailed forecasts, and an intuitive interface that adapts to any device.

## ✨ Features

### 🌟 Core Features
- 🔍 **Smart Search**: Search weather by city name with autocomplete
- 📍 **Auto Location**: Automatic location detection using browser geolocation
- 🌡️ **Detailed Weather**: Current conditions, feels like, humidity, wind speed, pressure
- 🌅 **Sun Times**: Beautiful sunrise & sunset information
- ⏰ **Hourly Forecast**: 8-hour detailed forecast with rain probability
- 📅 **5-Day Forecast**: Extended forecast with animated weather icons
- 💾 **Smart Memory**: Remembers your last searched location

### 🎨 UI/UX Excellence
- 📱 **Fully Responsive**: Perfect on mobile, tablet, and desktop
- 🌙 **Theme Toggle**: Smooth dark/light mode with system preference detection
- 🎭 **Dynamic Backgrounds**: Weather-reactive gradients and animations
- ✨ **Glassmorphism**: Modern glass-like UI elements with backdrop blur
- 🎬 **Smooth Animations**: Powered by Framer Motion for fluid interactions
- 🔄 **Unit Toggle**: Easy °C/°F temperature switching
- 🎯 **Weather Animations**: Custom animated icons for each weather condition
- 📊 **Rain Probability**: Smart rain chance calculations
- 🏷️ **SEO Optimized**: Dynamic page titles with weather info

### 🚀 Performance & UX
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🔄 **Smart Caching**: localStorage for preferences and last location
- 🎪 **Loading States**: Beautiful loading animations
- 🛡️ **Error Handling**: Graceful error messages with retry options
- 🔄 **Auto Refresh**: Floating refresh button for easy updates

## 🛠️ Technologies Used

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **JavaScript ES6+** - Modern JavaScript features
- **Vite** - Next-generation frontend tooling

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Custom CSS** - Enhanced animations and effects

### Icons & Assets
- **React Icons** - Comprehensive icon library
- **Weather Icons** - Specialized weather iconography
- **Feather Icons** - Clean, minimal UI icons

### API & Data
- **OpenWeatherMap API** - Reliable weather data
- **Browser Geolocation API** - Location services
- **localStorage** - Client-side data persistence

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`from-blue-500 to-purple-600`)
- **Success**: Emerald (`text-emerald-500`)
- **Warning**: Amber (`text-amber-500`)
- **Error**: Red (`text-red-500`)
- **Neutral**: Slate/Gray variants

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold, gradient text effects
- **Body**: Medium weight, optimized readability

### Animations
- **Entrance**: Fade + slide animations
- **Hover**: Scale and lift effects
- **Loading**: Smooth spinner animations
- **Weather**: Custom icon animations

## 🌐 API Integration

### OpenWeatherMap Endpoints
- **Current Weather**: `/weather`
- **5-Day Forecast**: `/forecast`
- **Hourly Data**: `/forecast` (8 hours)
- **Geolocation**: Coordinate-based queries

### Data Processing
- Temperature conversion (°C/°F)
- Rain probability calculation
- Time formatting and localization
- Weather condition mapping

## 📱 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full Support |
| Firefox | 88+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 90+     | ✅ Full Support |

## 🔧 Configuration Options

### Environment Variables
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### localStorage Keys
- `theme` - User's theme preference
- `temperatureUnit` - Temperature unit preference
- `lastSearchedCity` - Last searched city name
- `lastSearchedCoords` - Last used coordinates

### Code Style
- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 🙏 Acknowledgments

### APIs & Services
- **[OpenWeatherMap](https://openweathermap.org/)** - Weather data provider
- **[Browser Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)** - Location services

### Libraries & Frameworks
- **[React](https://react.dev/)** - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[Vite](https://vitejs.dev/)** - Build tool

### Inspiration
- Modern weather app designs
- Glassmorphism design trends
- Micro-interaction patterns

---

<div align="center">

**[🌐 Live Demo](https://sky-wave-jade.vercel.app/)**

Made with ❤️ by Brijesh Patel

⭐ **Star this repo if you found it helpful!**

</div>
