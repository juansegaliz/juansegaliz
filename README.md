# Juan Sebastian Galindo Lizcano - Personal Portfolio

Professional personal website built with Angular 17, Server-Side Rendering (SSR), Tailwind CSS, and strict MVVM architecture. Fully bilingual (ES/EN) with real-time language switching, dark/light themes, and optimized for performance, SEO, and accessibility (WCAG AA).

🌐 **Live Site**: [juansegaliz.com](https://juansegaliz.com)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [MVVM Architecture](#mvvm-architecture)
- [SEO & Accessibility](#seo--accessibility)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)

## Features

- ✅ **Angular 17** with SSR (Server-Side Rendering)
- ✅ **Strict MVVM Architecture** (Model-View-ViewModel)
- ✅ **Bilingual** ES/EN with real-time switching (ngx-translate)
- ✅ **Dark/Light Theme** with persistence (localStorage)
- ✅ **Tailwind CSS** with JIT compilation and responsive design
- ✅ **Lazy Loading** routes with preloading strategies
- ✅ **SEO Optimized** (meta tags, OpenGraph, Twitter Cards, JSON-LD, hreflang)
- ✅ **Accessibility** WCAG AA compliant
- ✅ **High Performance** (Lighthouse score ≥ 90)
- ✅ **Type-Safe** with strict TypeScript
- ✅ **Code Quality** with ESLint + Prettier

## Tech Stack

### Core
- **Angular 17.3+** (Standalone APIs)
- **TypeScript 5.4+**
- **RxJS 7.8+**

### UI & Styling
- **Tailwind CSS 3.3+**
- **CSS Variables** for theming
- **Responsive Design** (mobile-first)

### Internationalization
- **ngx-translate** for runtime i18n
- **Language detection** from browser
- **Persistent language preference**

### Server-Side Rendering
- **Angular Universal** (@angular/ssr)
- **Express.js** server
- **Client Hydration**

## Project Structure

```
src/
├── app/
│   ├── core/                          # Core functionality
│   │   ├── theme/                     # Theme service (dark/light)
│   │   ├── i18n/                      # Language service & translation loader
│   │   └── seo/                       # SEO service (meta, JSON-LD, hreflang)
│   ├── models/                        # Domain models (pure TypeScript)
│   ├── infrastructure/                # Data access layer
│   │   ├── repositories/              # Repository contracts & implementations
│   │   └── mappers/                   # DTO to Model mappers
│   └── presentation/                  # UI layer
│       ├── viewmodels/                # ViewModels (state + actions)
│       ├── shared/components/         # Reusable UI components
│       └── pages/                     # Page components (Views)
├── assets/
│   ├── data/                          # Content data by language (es/en)
│   └── i18n/                          # Translation files
├── main.ts                            # Client entry point
├── main.server.ts                     # Server entry point
└── app.config.ts                      # App configuration
```

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher (20.x recommended)
- **npm** 9.x or higher
- **Docker** (optional, for containerized deployment)

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Start development server**

```bash
npm run dev:ssr
```

The application will be available at `http://localhost:4200`

## Development

### Available Scripts

- `npm start` - Start development server (client-side only)
- `npm run dev:ssr` - Start development server with SSR
- `npm run build` - Build for production (client + server)
- `npm run build:ssr` - Build with SSR optimizations
- `npm run serve:ssr` - Serve production SSR build
- `npm test` - Run unit tests
- `npm run lint` - Lint TypeScript and HTML files
- `npm run format` - Format code with Prettier

### MVVM Guidelines

#### Models
- Pure TypeScript interfaces/classes
- No Angular dependencies
- Represent domain entities

#### ViewModels
- Injectable services
- Manage UI state with `signal()` or `BehaviorSubject`
- Expose readonly state to Views
- Orchestrate data fetching via Repositories
- Handle UI actions (filters, search, submit)

#### Views (Pages/Components)
- Standalone Angular components
- Subscribe to ViewModel state
- No direct HTTP calls or business logic
- Pure presentation logic only

#### Repositories
- Abstract contracts + concrete implementations
- Handle data fetching (HTTP, localStorage, etc.)
- Map DTOs to Models
- No UI-related code

## Building for Production

### Build

```bash
npm run build:ssr
```

This creates optimized bundles in `dist/frontend/`:
- `browser/` - Client-side bundles
- `server/` - Server-side bundles

### Serve Locally

```bash
npm run serve:ssr
```

The production server runs on `http://localhost:4000`

## Deployment

### Docker Deployment (Recommended)

The application includes a production-ready Dockerfile with multi-stage builds for optimal image size.

#### Build the Docker image

```bash
docker build -t juansegaliz-portfolio .
```

#### Run the container

```bash
# Run in foreground
docker run -p 4000:4000 juansegaliz-portfolio

# Run in background (detached mode)
docker run -d --name portfolio -p 4000:4000 juansegaliz-portfolio

# View logs
docker logs portfolio

# Stop container
docker stop portfolio

# Remove container
docker rm portfolio
```

#### Docker Compose (Optional)

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "4000:4000"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

### CapRover Deployment

1. Push your code to a Git repository
2. Create a new app in CapRover
3. Connect your repository
4. CapRover will automatically detect the Dockerfile and deploy

### Traditional Server Deployment

#### Using PM2

```bash
# Install PM2
npm install -g pm2

# Build the application
npm run build:ssr

# Start with PM2
pm2 start dist/frontend/server/server.mjs --name portfolio

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal (already configured by certbot)
```

## MVVM Architecture

This project follows a strict **MVVM (Model-View-ViewModel)** architecture pattern:

```
View (Component) → ViewModel (Service) → Repository → Model
```

### Benefits

- **Separation of Concerns**: Clear boundaries between UI and business logic
- **Testability**: ViewModels can be unit tested independently
- **Maintainability**: Changes to UI don't affect business logic
- **Reusability**: ViewModels can be shared across components

## SEO & Accessibility

### SEO Features

- Dynamic meta tags per route
- OpenGraph tags for social sharing
- Twitter Card meta tags
- JSON-LD structured data (Person + WebSite)
- Canonical URLs
- Hreflang tags for multilingual SEO
- Sitemap.xml & Robots.txt
- Server-Side Rendering for crawlers

### Accessibility (WCAG AA)

- Semantic HTML5
- ARIA attributes
- Keyboard navigation
- Focus indicators
- Alt text for images
- Color contrast ratios
- Screen reader support

## Performance Optimization

- Lazy Loading routes
- Preloading critical routes
- Server-Side Rendering
- Client Hydration
- Code Splitting
- Tree Shaking
- Minification
- Asset caching

## Testing

```bash
npm test
```

Test strategy:
- ViewModels: State management and business logic
- Repositories: Data fetching and mapping
- Components: Rendering and user interactions

## Environment Variables

No environment variables are required for basic operation. All configuration is managed through:
- `src/assets/data/` - Content data (ES/EN)
- `src/assets/i18n/` - UI translations

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## License

© 2024-2025 Juan Sebastian Galindo Lizcano. All rights reserved.

---

**Built with** ❤️ **using Angular, TypeScript, and Tailwind CSS**
