# Repeat Timer

Repeat Timer is a standalone Angular application that runs repeating countdown cycles (e.g., 8 minutes). When a cycle ends, the app plays a looping beep until the user presses **Next**, which immediately starts the next interval. The timer continues indefinitely until the user presses **Done**.

The app is designed to run on:
- Web (Angular)
- Windows (Electron or Tauri)
- Android (Capacitor)

## Features
- Repeating countdown timer
- Looping beep alert at the end of each cycle
- Adjustable interval (+1 min / –1 min)
- Endless cycles until user presses **Done**
- Clean standalone Angular architecture
- Cross-platform packaging (Web, Windows, Android)

## Tech Stack
- Angular 17+ (standalone components)
- TypeScript
- SCSS
- Node.js + npm
- Optional packaging:
  - Electron (Windows)
  - Tauri (Windows, lightweight)
  - Capacitor (Android)

## Project Structure
repeat-timer/
  src/
    app/
      timer/
        timer.component.ts
        timer.component.html
        timer.component.scss
    assets/
      beep.mp3
  angular.json
  package.json
  README.md
  TECHNICAL_TASK.md

## Getting Started

### 1. Install dependencies
npm install

### 2. Run the development server
ng serve

Open in browser:
http://localhost:4200

## Timer Logic Overview
- Default interval: 8 minutes
- Countdown runs using setInterval
- When timer reaches 0:
  - Beep sound loops
  - UI displays “Time’s up”
  - Timer waits for user action
- Next:
  - Stops beep
  - Starts next interval immediately
- Next +1 min / –1 min:
  - Adjusts base interval for future cycles
- Done:
  - Stops timer and audio

## Building for Production

### Web Build
ng build

Output is in:
dist/repeat-timer/

## Packaging for Windows

### Option A — Electron
ng add @electron/cli
npm run electron:start
npm run electron:build

### Option B — Tauri
npm install @tauri-apps/cli @tauri-apps/api
npm run build
npm run tauri build

## Packaging for Android (Capacitor)

### 1. Add Capacitor
ng add @capacitor/angular

### 2. Build Angular
ng build

### 3. Sync
npx cap sync

### 4. Open Android Studio
npx cap open android

Build APK from Android Studio.

## Development in Visual Studio 2026
1. File → Open → Folder… → select project folder
2. Ensure Node.js Development workload is installed
3. Use npm Scripts panel to run:
   - start
   - build
4. Optional: add Chrome debug profile for F5 debugging

## Assets
Place your beep sound here:
src/assets/beep.mp3

## Future Enhancements
- Preset intervals
- Dark/Light theme
- Lab-style UI
- Cycle statistics
- Persistent settings
