# Mobile Web Notes App

A modern, scalable notes app foundation built with Expo and React Native. This project focuses on a clean architecture, reusable UI primitives, and a production-ready setup for authentication, routing, state management, and native development builds.

This is currently an architecture-first starter, intended to accelerate feature development while staying maintainable as the app grows.

## Features

### Core Functionality

- Authentication flow scaffold (login/register/logout) with Appwrite
- Route protection with Expo Router auth and tabs groups
- Persistent UI preferences (theme mode) with Zustand + AsyncStorage
- Development build workflow for native iOS and Android

### User Experience

- Styled auth and settings screens
- Theme preference support (`auto`, `light`, `dark`)
- Status bar styling that updates on tab focus
- Custom splash assets for light/dark mode

### Technical Features

- Type-safe architecture with strict TypeScript
- Service layer abstraction for API and auth access
- Reusable UI components (`Button`, `Card`, `TextField`)
- Form validation with `react-hook-form`

## Tech Stack

### Mobile / Frontend

- Expo SDK 55
- React Native 0.83
- React 19
- Expo Router
- NativeWind + Tailwind CSS
- React Hook Form

### State & Services

- Zustand
- Appwrite SDK
- Axios
- AsyncStorage

### Tooling

- TypeScript
- ESLint (flat config)
- Prettier + Tailwind plugin
- Dev Client (`expo-dev-client`)

## Architecture

### Routing

- `app/(auth)` for unauthenticated screens
- `app/(tabs)` for authenticated app screens
- Guards in route layouts to redirect based on session state

### Data & Auth Flow

- UI → hooks/stores/providers → services → Appwrite/API
- Auth bootstrap handled by `AuthProvider`
- UI components never call Appwrite directly

### State Management

- `authStore`: session/user/loading/bootstrap state
- `uiStore`: theme preference + persistence

## Project Structure

```text
app/
  (auth)/
  (tabs)/
  _layout.tsx

src/
  components/
    auth/
    ui/
  config/
  constants/
  features/
  hooks/
  lib/
  providers/
  services/
    api/
    appwrite/
  store/
  types/
  utils/
```

## Getting Started

Running this locally requires a native mobile setup (Xcode and Android SDK) and optional Appwrite credentials.

### Prerequisites

- Node.js 20+
- npm 10+
- Xcode + iOS Simulator (macOS)
- Android Studio + Android SDK
- Java 17 (for Android Gradle builds)

### Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd mobile-web-notes-app
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```bash
EXPO_PUBLIC_APPWRITE_ENDPOINT=
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_API_BASE_URL=
```

### Run the App

Start Metro (dev client):

```bash
npm run start:dev
```

Run iOS:

```bash
npm run ios:dev
```

Run Android:

```bash
npm run android:dev
```

Run both platforms + Metro together:

```bash
npm run dev:all
```

## Available Scripts

```bash
npm run start
npm run start:dev
npm run dev:all
npm run ios:dev
npm run android:dev
npm run lint
npm run typecheck
npm run format
npm run format:check
```

## Configuration Notes

- App config: `app.json`
- TS paths and strict mode: `tsconfig.json`
- NativeWind/Tailwind config: `tailwind.config.js`
- Babel config: `babel.config.js`
- Metro + global styles: `metro.config.js`, `global.css`

## Splash Customization

Replace these files with your own branding:

- `assets/splash/splash-logo-light.png`
- `assets/splash/splash-logo-dark.png`

Then rebuild native apps:

```bash
npm run ios:dev
npm run android:dev
```

## TODOs

- Pincode/Biometrics functionality for already logged in users
- Notes domain modules under `src/features/notes`
- Per-user settings/profile integration with appwrite backend
- Automated tests (unit/integration/e2e)
- CI pipeline with lint + typecheck + formatting gates
- i18n translations
- Logo's and other assets clean up
- Observability with Sentry
- Unit/e2e tests
- Use the new middleware file for auth
