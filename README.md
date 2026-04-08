Dev (local web)
Start Vite dev server:
npm run dev
Alternate (Ionic CLI dev server):
npx ionic serve
If you want device livereload (device must reach your dev machine):
npm run dev -- --host
or use Ionic: npx ionic capacitor run android -l --external
🏗 Build (production artifact)
Build production bundle (type-check + Vite build):
npm run build
Resulting files are in dist/ (deploy this folder).

Prod / Preview (serve the built files locally)
Preview the built app (local static server):
npm run preview
For real production deploy, host dist/ on your static host (Netlify/Vercel/S3/nginx/etc.)


🤖 Android (emulator or physical device)
Prerequisites: Android Studio + Android SDK + JDK, set ANDROID_HOME/JAVA_HOME, and have adb available.

Typical flow:

Build web assets:
npm run build
Sync Capacitor Android project:
npx cap sync android
Open Android Studio:
npx cap open android
From Android Studio: run on emulator or device (or build release).

Quick CLI run (may open/build automatically):

npx cap run android
For livereload on device (device must access dev server):

npx ionic capacitor run android -l --external

🔐 Release (Play Store)
In Android Studio: Build > Generate Signed Bundle / APK (preferred)
Or from CLI in android:
cd android
.\gradlew assembleRelease (Windows)
or ./gradlew bundleRelease
Ensure you configure signing configs (keystore) before releasing.

If device can't reach dev server for livereload, use --external and ensure firewall allows the port and you used your machine’s LAN IP.
If you change native plugins, run:
npx cap sync
If builds fail, check environment variables (Android SDK paths, JDK) and run the build from Android Studio to see full errors.

App: 
Sign In Page:
email and password authentication using Firebase Authentication. (Login page, input fields validation, error handling, login button, loading states)
Forgot Password Page:
Users can reset their password via email using Firebase Authentication's password reset feature. First, take user email. Send a link in the email, then redirect back to app to a different screen to change password. (Reset pages, input field for email, validation, error handling, confirmation messages)
User Registration:
New users can create an account using email and password via Firebase Authentication. (Registration page, input fields validation, error handling, registration button, loading states) (First Name, Last Name, Phone Number (Austrailia only), Email, Password, Confirm Password)
verification of their email with a link sent to their email address upon registration. (Email verification page, resend verification email option, confirmation messages)

Autofill enabled for all input fields in the app. Should be very accessible. 
Proper session management in app and web respectively should be implemented and handled to keep users logged in across app restarts and page refreshes.


Profile Management: