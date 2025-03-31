# SyncTimer

A simple timer application built with React Native and Expo.

## ✨ Features

- Create and manage multiple timers.
- Categorize timers for better organization.
- Start, pause, and reset timers.
- Displays a halfway alert
- Persistent storage using AsyncStorage.

## 🔧 Technologies Used

- TypeScript
- Expo
- React Native
- React Native Async Storage

## 📦 Installation

```sh
git clone https://github.com/AshwiniParaye1/SyncTimer.git
cd SyncTimer
npm install
npm start
```

This will open the Expo development tool in your browser.

### You can run the app by either:

- Scanning the QR code with the Expo Go app on your iOS or Android device.
- Running it on an emulator (Android Studio or Xcode).

## 📂 Project Structure

```
├── app.json
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── history.tsx
│   │   ├── index.tsx
│   ├── +not-found.tsx
│   ├── _layout.tsx
├── assets
│   ├── fonts
│   │   ├── SpaceMono-Regular.ttf
│   ├── images
├── components
│   ├── AddTimerModal.tsx
│   ├── CompletionModal.tsx
│   ├── HalfwayAlert.tsx
│   ├── TimerList.tsx
│   ├── TimerProgress.tsx
│   ├── __tests__
│   │   ├── ThemedText-test.tsx
│   │   ├── __snapshots__
│   │   │   ├── ThemedText-test.tsx.snap
│   ├── ui
│   │   ├── IconSymbol.ios.tsx
│   │   ├── IconSymbol.tsx
│   │   ├── TabBarBackground.ios.tsx
│   │   ├── TabBarBackground.tsx
├── constants
│   ├── Colors.ts
├── hooks
│   ├── useFrameworkReady.tsx
│   ├── useTimerHistory.tsx
│   ├── useTimers.tsx
├── package.json
├── scripts
│   ├── reset-project.js

```

## Usage

1.  **Adding a Timer:**

- Tap the "+" button on the main screen.
- Enter the timer name, duration (in seconds), and category.
- Enable or disable the halfway alert.
- Tap "Add Timer" to save the timer.

2.  **Managing Timers:**

- Timers are grouped by category.
- Tap a category header to expand or collapse the timers within it.
- Use the play, pause, and reset buttons to control individual timers.
- The timer list will show you the remaining time

## 🤝 Contribution

We welcome contributions! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Submit a pull request.

## ❤️ Support

Thank you for checking out SyncTimer! If you find it useful, consider giving it a star on GitHub!
