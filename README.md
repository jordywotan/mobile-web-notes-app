# Mobile Web Notes App — Foundation Architecture

Production-ready, schaalbare React Native basis met Expo, TypeScript, NativeWind, Appwrite auth, Expo Router en Zustand.

## 1) Installatie stappen (CLI)

```bash
# 1. Project scaffolden
npx create-expo-app@latest mobile-web-notes-app --template blank-typescript
cd mobile-web-notes-app

# 2. Expo/React Native dependencies
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-reanimated react-native-gesture-handler react-dom react-native-web

# 3. Core app dependencies
npm install nativewind tailwindcss zustand appwrite axios @react-native-async-storage/async-storage

# 4. Code quality tooling
npm install -D eslint prettier eslint-config-prettier eslint-plugin-import @typescript-eslint/eslint-plugin @typescript-eslint/parser @eslint/js@9.39.0 globals eslint-import-resolver-typescript

# 5. Start
npm run start
```

## 2) Folder structuur

```text
app/
  (auth)/
    _layout.tsx
    login.tsx
    register.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    settings.tsx
  _layout.tsx

src/
  components/
    ui/
      AppText.tsx
      Screen.tsx
  features/
    README.md
  services/
    appwrite/
      appwriteClient.ts
      authService.ts
    api/
      apiClient.ts
  hooks/
    useAuthStore.ts
    useUIStore.ts
  store/
    authStore.ts
    uiStore.ts
    index.ts
  utils/
    noop.ts
  constants/
    designTokens.ts
  types/
    auth.ts
  lib/
    index.ts
  providers/
    AppProviders.tsx
    AuthProvider.tsx
    ThemeProvider.tsx
  config/
    env.ts

global.css
babel.config.js
metro.config.js
tailwind.config.js
eslint.config.mjs
.prettierrc
.env
```

## 3) Config highlights

- `package.json`
  - `main: expo-router/entry`
  - scripts: `lint`, `typecheck`, `format`, `format:check`
- `tsconfig.json`
  - `strict: true`
  - path aliases: `@/*` -> `src/*`, `@app/*` -> `app/*`
- `app.json`
  - `scheme` + `expo-router` plugin
  - `userInterfaceStyle: automatic`
- `babel.config.js`
  - `nativewind/babel` + `react-native-reanimated/plugin`
- `metro.config.js`
  - NativeWind integration met `global.css`
- `tailwind.config.js`
  - NativeWind preset + design tokens (colors/spacing/typography)
- `.env`
  - verplicht aanwezig met lege Appwrite vars:
    - `EXPO_PUBLIC_APPWRITE_ENDPOINT=`
    - `EXPO_PUBLIC_APPWRITE_PROJECT_ID=`

## 4) Boilerplate principes in deze setup

- **Auth flow**
  - Appwrite client + auth service abstractie in `src/services/appwrite/*`
  - `AuthProvider` beheert bootstrap/login/register/logout
  - Zustand `authStore` houdt session/user/loading/bootstrapped state bij
  - Protected routes in `app/_layout.tsx` via `RouteGuard`
- **State management**
  - Feature-based stores: `authStore`, `uiStore`
  - `uiStore` gebruikt persist middleware (AsyncStorage)
  - Custom selector hooks in `src/hooks/*`
- **Services layer**
  - Geen directe API/Appwrite calls in UI
  - `apiClient` (Axios) met interceptor placeholders
- **Styling**
  - NativeWind via utility classes
  - Design tokens in `src/constants/designTokens.ts`

## 5) Best practices (enterprise-ready)

- Houd business logic uit schermen/components; gebruik services + stores + hooks.
- Voeg feature modules toe onder `src/features/<feature>` met eigen types, services en UI.
- Beperk globale state tot client state; server data abstraheren via services en later eventueel query layer.
- Gebruik selector hooks om onnodige re-renders te vermijden.
- Valideer env-config bij app startup en fail-fast op kritieke services.
- Houd lint/typecheck/format in CI als quality gate.

## 6) Later design & features toevoegen

1. Voeg een design system laag toe in `src/components/ui` (Button, Input, Card).
2. Maak per domein een feature-map onder `src/features`.
3. Bouw API modules per feature bovenop `apiClient`.
4. Voeg error boundaries, analytics en monitoring providers toe in `AppProviders`.
5. Introduceer tests (unit/integration/e2e) per feature en route group.

## Nuttige scripts

```bash
npm run lint
npm run typecheck
npm run format:check
npm run format
```

## Splash screen customizen

- Vervang deze bestanden met je eigen branding:
  - `assets/splash/splash-logo-light.png`
  - `assets/splash/splash-logo-dark.png`
- Pas achtergrondkleuren aan in `app.json` onder `expo.splash.backgroundColor` en `expo.splash.dark.backgroundColor`.
- Voor Development Build wijzigingen opnieuw doorvoeren in native app:

```bash
# iOS
npm run ios:dev

# Android
npm run android:dev
```

