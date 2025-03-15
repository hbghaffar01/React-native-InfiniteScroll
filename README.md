# InfiniteScroll - React Native App

A React Native infinite scrolling application that demonstrates loading data progressively as the user scrolls.

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- JDK 11 or newer
- Android Studio (for Android development)
- Android SDK
- Git

### Installation

1. Clone the repository:

```sh
git clone https://github.com/hbghaffar01/React-native-InfiniteScroll
cd React-native-InfiniteScroll
```

2. Install dependencies:

```sh
npm install
# OR
yarn install
```

## Development

### Start Metro Server

First, start the Metro dev server:

```sh
npm start
# OR
npm run react-native run-android
```

### Run on Development Device/Emulator

With Metro running, open a new terminal and use one of the following commands:

#### Android

```sh
npm run android
# OR
npm run react-native run-android
```

#### iOS

Install CocoaPods dependencies first (only needed initially or after updating native dependencies):

```sh
bundle install
bundle exec pod install
```

Then run:

```sh
npm run ios
# OR
npm run react-native run-ios
```

## Building for Production

### Android APK

1. Generate a signing key:

```sh
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Move the keystore file to the `android/app/` directory or update `gradle.properties` with the full path

3. Configure signing in `android/gradle.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_password
MYAPP_RELEASE_KEY_PASSWORD=your_password
```

4. Build the release APK:

```sh
cd android
# Run this
gradlew assembleRelease
```

5. The APK will be generated at:
   `android/app/build/outputs/apk/release/app-release.apk`

### Installing the APK on a Device

1. Transfer the APK to your Android device
2. On your device, enable "Install from Unknown Sources" in Security settings
3. Navigate to the APK file and tap to install

Alternatively, with a connected device:

```sh
adb install "path/to/app-release.apk"
```

## Project Structure

- `/android` - Android native code
- `/ios` - iOS native code
- `/src` - React Native JavaScript/TypeScript code
  - `/components` - Reusable UI components
  - `/store` - Redux store configuration
  - `/utils` - Helper utilities

## Technologies Used

- React Native 0.77.1
- Redux Toolkit
- TypeScript
- React Native Safe Area Context