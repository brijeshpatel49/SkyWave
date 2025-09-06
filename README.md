# SkyWave 🌤️

A stunning, responsive weather application built with modern web technologies. Experience beautiful weather animations, detailed forecasts, and an intuitive interface that adapts to any device.

![SkyWave Weather App](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=SkyWave+Weather+App)

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

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenWeatherMap API key** (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skywave-weather-app.git
   cd skywave-weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Add your OpenWeatherMap API key to .env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   
   🔑 Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Architecture

```
skywave-weather-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Navigation.jsx  # Top navigation bar
│   │   ├── SearchBar.jsx   # Search functionality
│   │   ├── WeatherCard.jsx # Current weather display
│   │   ├── HourlyForecast.jsx # Hourly weather data
│   │   ├── Forecast.jsx    # 5-day forecast
│   │   ├── WeatherAnimations.jsx # Animated weather icons
│   │   ├── ThemeToggle.jsx # Dark/light mode switch
│   │   ├── LoadingSpinner.jsx # Loading animations
│   │   ├── ErrorMessage.jsx # Error handling
│   │   ├── RefreshButton.jsx # Refresh functionality
│   │   └── Footer.jsx      # Footer with tech stack
│   ├── utils/
│   │   └── api.js          # Weather API functions
│   ├── App.jsx             # Main application
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── .env.example            # Environment template
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.cjs      # PostCSS configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

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

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

**[🌐 Live Demo](https://skywave-weather.vercel.app)** • **[📚 Documentation](https://github.com/yourusername/skywave-weather-app/wiki)** • **[🐛 Report Bug](https://github.com/yourusername/skywave-weather-app/issues)** • **[✨ Request Feature](https://github.com/yourusername/skywave-weather-app/issues)**

Made with ❤️ by the SkyWave Team

⭐ **Star this repo if you found it helpful!**

</div>