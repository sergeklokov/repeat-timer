# Repeat Timer

Repeat Timer is a standalone Angular 21 application built using the Visual Studio 2026 template. It is designed to run repeating countdown cycles for productivity, training, or time-based workflows.

## 🚀 Features

- ⏱️ Custom countdown duration (e.g., 8 minutes)
- 🔁 Automatic repeating timer cycles
- 🔔 Looping alert sound when a cycle completes
- ▶️ **Next** button to immediately start the next interval
- ✅ **Done** button to stop the timer completely
- ⚡ Lightweight standalone Angular application (no NgModules)

## 🎯 How It Works

1. The user sets a countdown duration (in seconds or minutes).
2. Press **Start** to begin the timer.
3. When the countdown reaches zero:
   - A looping beep sound plays.
4. The user can:
   - Press **Next** to stop the alarm and begin a new cycle immediately.
   - Press **Done** to stop the timer and end the session.
5. The cycle repeats indefinitely until stopped.

## 🛠️ Technology Stack

- Angular 21 (standalone architecture)
- TypeScript
- RxJS for timer logic
- HTML5 Audio API for sound alerts

## ▶️ Running the App

```bash
npm install
ng serve
