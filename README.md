# ResoLift - Your Goal Tracking Companion 🎯

A modern goal tracking application built with [Expo](https://expo.dev) and React Native.

## Features

- 📱 Cross-platform support (iOS & Android)
- 🎯 Goal tracking and management
- 📊 Progress visualization
- 🔔 Customizable reminders
- 🌙 Dark mode support
- 💾 Local data persistence with SQLite
- 🔄 File-based routing

## Tech Stack

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [NativeWind](https://nativewind.dev) for styling
- [DrizzleORM](https://orm.drizzle.team) with SQLite
- [React Hook Form](https://react-hook-form.com) for form management
- [Zod](https://zod.dev) for validation

## Local-First Architecture

ResoLift uses a robust local-first architecture for optimal performance and offline capabilities:

### Data Storage

- **SQLite**: Primary database using DrizzleORM with SQLCipher encryption
- **MMKV**: High-performance key-value storage for app state and user preferences
- **File System**: Local storage for assets and cached data

### Key Components

- DrizzleORM migrations for database schema versioning
- Automatic data synchronization with SQLite
- Type-safe database queries with TypeScript
- Encrypted storage on iOS using SQLCipher

### Data Flow

1. Local data mutations through DrizzleORM
2. Real-time UI updates via useLiveQuery
3. Automatic persistence to SQLite
4. Background sync capabilities (coming soon)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npx expo start
   ```

3. Choose your development environment:
   - [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [Expo Go](https://expo.dev/go) on your physical device

## Development

The project uses a file-based routing system. Main directories:

- `/app` - Application screens and routing
- `/components` - Reusable UI components
- `/database` - Database configuration and migrations
- `/lib` - Utility functions and constants

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learn More

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [NativeWind Documentation](https://nativewind.dev/getting-started)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
