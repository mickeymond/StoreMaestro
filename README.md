# StoreMaestro

This is a [**React Native**](https://reactnative.dev) application for managing store inventory and sales. It uses Firebase for backend services, including authentication and database.

# Getting Started for First-Timers

This guide will walk you through setting up the project for the first time.

## 1. Prerequisites

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions. This includes installing:
- Node.js (v18 or newer)
- Watchman (for macOS)
- JDK (for Android development)
- Android Studio (for Android development)
- Xcode (for iOS development)

## 2. Clone and Install Dependencies

First, clone the repository to your local machine and install the necessary npm packages.

```bash
git clone <repository-url>
cd storemaestro
npm install
```

## 3. Firebase Setup

This project uses Firebase for authentication and database services. You will need to set up a new Firebase project.

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2.  **Add an Android App**:
    *   In your Firebase project dashboard, click the Android icon to add a new Android app.
    *   For the "Android package name", use `io.mickeymond.storemaestro`.
    *   Download the `google-services.json` file.
    *   Move the downloaded `google-services.json` file into the `android/app/` directory of this project.

3.  **Add an iOS App**:
    *   Back in the Firebase project dashboard, click "Add app" and then select the iOS icon.
    *   For the "Apple bundle ID", use `io.mickeymond.storemaestro`.
    *   Download the `GoogleService-Info.plist` file.
    *   Open the `ios/StoreMaestro.xcworkspace` file in Xcode. Drag and drop the downloaded `GoogleService-Info.plist` file into the `StoreMaestro` folder in the Xcode project navigator.

4.  **Enable Firebase Services**:
    *   In the Firebase Console, navigate to the **Authentication** section and enable the **Google** sign-in provider.
    *   Navigate to the **Firestore Database** section and create a database. Start in **test mode** for easier setup.

## 4. Google Sign-In Configuration

To enable Google Sign-In, you need to configure the OAuth client ID.

1.  **Get Web Client ID**:
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Make sure your Firebase project is selected.
    *   Navigate to **APIs & Services > Credentials**.
    *   Find the **OAuth 2.0 Client IDs** section. You should see a "Web client" that was automatically created by Firebase.
    *   Copy the **Client ID** from the "Web client".

2.  **Create `.env` file**:
    *   In the root of the project, create a new file named `.env`.
    *   Add the Web Client ID you copied to the `.env` file like this:
        ```
        GOOGLE_OAUTH_CLIENT_ID=your-web-client-id-goes-here
        ```

3.  **Configure Android Keystore**:
    *   For Google Sign-In to work on Android, you must add your machine's SHA-1 fingerprint to the Firebase project settings.
    *   Run the following command in the `android` directory:
        ```bash
        cd android
        ./gradlew signingReport
        ```
    *   This will print a list of SHA-1 and SHA-256 fingerprints. Copy the `SHA1` value for the `debug` variant.
    *   In the Firebase Console, go to **Project Settings > General**. Scroll down to your Android app and click **Add fingerprint**. Paste the SHA-1 key there.
    *   `cd ..` to return to the project root.

## 5. Final Setup Steps

### For iOS

You need to install the native iOS dependencies using CocoaPods.

```bash
# From the root of the project
cd ios
pod install
cd ..
```

### For Android

No additional steps are required.

## 6. Running the Application

You are now ready to run the app!

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

If everything is set up correctly, the app should launch in your Android Emulator or iOS Simulator.

# Troubleshooting

- **Android: `Execution failed for task ':app:processDebugGoogleServices'`.**
  This usually means the `google-services.json` file is missing or in the wrong place. Make sure it's in `android/app/`.

- **iOS: Build fails related to Firebase.**
  This can happen if the `pod install` step was missed or if the `GoogleService-Info.plist` file is not correctly added to the Xcode project.

- **Google Sign-In fails.**
  - Double-check that the `GOOGLE_OAUTH_CLIENT_ID` in your `.env` file is correct.
  - For Android, ensure your SHA-1 fingerprint is added to the Firebase project settings.
