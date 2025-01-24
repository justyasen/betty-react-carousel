# Betty React Carousel 🎠

## 📱 Overview
A modern, infinite-scrolling image carousel built with React and TypeScript, featuring dynamic image loading from Picsum Photos API.

## 🚀 Quick Start

**Install dependencies**
yarn install

**Start development server**
yarn start

**Run tests**
yarn test

## 🛠 Tech Stack
- React 19.0.0
- TypeScript 4.4.2
- React Query 3.39.3
- Axios 1.7.9
- Jest & React Testing Library
- CSS3 Animations

---

## 📂 Features Base Architecture
src/
├── components/
│ ├── ImageCarousel/
│ │ ├── ImageCarousel.tsx
│ │ └── ImageCarousel.css
│ └── CarouselSlider/
│ ├── CarouselSlider.tsx
│ └── CarouselSlider.css
├── hooks/
│ └── useImageLoader.ts
├── types/
│ └── types.ts
└── tests/
└── tests/


## 📈 Data Flow
Picsum API -> React Query Cache -> useImageLoader Hook -> ImageCarousel -> CarouselSlider -> Rendered UI

## Key Features

1. **Image Carousel**
   - Infinite horizontal scrolling
   - Dynamic image loading
   - Responsive design
   - Lazy loading support

2. **Data Management**
   - React Query for efficient caching
   - Infinite query pagination
   - Optimistic loading states

3. **Performance**
   - Image lazy loading
   - Optimized re-renders
   - Efficient scroll handling

4. **Error Management**
   - Graceful error handling
   - User-friendly error messages
   - Loading states

## Component Architecture

### ImageCarousel
Main orchestrator component that:
- Manages image loading states
- Handles error scenarios
- Coordinates with CarouselSlider

### CarouselSlider
Handles the UI mechanics including:
- Infinite scroll behavior
- Image display and animations
- Loading indicators

### useImageLoader Hook
Custom hook managing:
- API interactions
- Pagination logic
- Cache management

## Error Management
- Comprehensive error boundaries
- User-friendly error messages
- Loading state indicators

## Testing
Run all tests
yarn test
