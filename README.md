<div align="center">
  <img src="src/assets/video-player.png" alt="Filme Logo" width="80" />
  <h1>Filme</h1>
  <p><strong>The modern, premium cinematic discovery platform.</strong></p>
</div>

<br />

## 🎬 Overview

**Filme** is an immersive and highly responsive web application designed for discovering movies and TV shows. Inspired by premium OTT platforms, Filme delivers a breathtaking cinematic user interface characterized by glassmorphism, dynamic background gradients, and incredibly smooth frame-level animations. Whether a user is looking for what's trending, adding gems to their watchlist, or exploring in-depth movie metadata, Filme offers an unparalleled modern browsing experience.

## ✨ Core Features

* **Cinematic Hero Display:** An auto-playing YouTube trailer background paired with a glass-frosted information panel and progress-tracking logic gracefully welcomes users.
* **Intelligent Search Capabilities:** Instantly look up any movie or show across the comprehensive TMDB database via fully functional live-search fields integrated deeply throughout the site. 
* **Dynamic Watchlist:** Users can continuously track their favorite films—tapping the "Heart" instantly saves it to their persistent Watchlist tracker.
* **Premium User Interface:** Engineered utilizing advanced customized Chakra UI component tokens, guaranteeing precise layout control across dark-mode themes. Everything from interactive thumbnails, timeline scrubbing mechanics, to global hover states feels snappy and luxurious. 
* **Flawless Mobile Optimization:** Every pixel elegantly transforms onto mobile screens. Interactive horizontal strips elegantly tuck away into Drawer menus without sacrificing any native navigation operations.
* **Rich Metadata Views:** Dive into dedicated property pages revealing extended statistics covering Cast & Crew tracking, studio budgets, aggregate global ratings, and related user reviews. 

## 🛠️ Technology Stack

* **Core:** React 18, Vite
* **Routing:** React Router v7
* **Styling System & UI Kit:** Chakra UI v3, Emotion
* **Animations:** Framer Motion
* **Iconography:** Lucide React
* **Data Integration:** TMDB (The Movie Database) V3 REST API

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and `npm` installed. You will also need a TMDB API Key. 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/filme.git
   cd filme
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Provide your Environment Variables:**
   Create a `.env` file at the root of the project and supply your API key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Boot up the local development server:**
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` to interact with Filme locally!

## 📂 Architecture

```
src/
├── assets/             # Static configurations and custom media assets
├── components/         # Highly reusable, decoupled UI elements (Cards, Heroes, Navigation, Dashboard)
│   ├── ui/             # Chakra UI v3 custom snippet components (Buttons, Drawers, Inputs)
├── hooks/              # Custom React Hooks abstracting TMDB fetch schemas and state management
├── pages/              # Isolated primary Page elements mapping to Router configurations
├── services/           # Underlying network request management layer (Axios API bindings)
└── utils/              # Exported constants encompassing base API URLs, TMDB poster scaling routes, etc.
```

## 🤝 Contributing

Contributions are always welcome. Since Filme focuses intensely on high aesthetic benchmarks, we encourage Pull Requests targeting front-end UI micro-animations, loading skeleton refinements, and test-case integrations. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingRefactor`)
3. Commit your Changes (`git commit -m 'Added an AmazingRefactor'`)
4. Push to the Branch (`git push origin feature/AmazingRefactor`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License.
