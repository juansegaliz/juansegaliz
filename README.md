# Juan Sebastian Galindo Lizcano - Personal Portfolio

Professional personal website built with Angular 20, Server-Side Rendering (SSR), Tailwind CSS, and strict MVVM architecture. Fully bilingual (ES/EN) with real-time language switching, dark/light themes, and optimized for performance, SEO, and accessibility (WCAG AA).

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

- **Node.js** 18.x or higher
- **npm** 9.x or higher

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

### Nginx Configuration

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
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Docker Deployment

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:ssr

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --production
EXPOSE 4000
CMD ["node", "dist/frontend/server/server.mjs"]
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

---

**Built with** ❤️ **using Angular, TypeScript, and Tailwind CSS**

© 2024 Juan Sebastian Galindo Lizcano. All rights reserved.
