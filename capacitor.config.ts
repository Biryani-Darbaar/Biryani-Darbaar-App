import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.biryani.app",
  appName: "foodhut",
  webDir: "dist",
  server: {
    url: "http://13.239.77.189:5173/",
  },
  // plugins: {
  //   FirebaseMessaging: {
  //     presentationOptions: ["badge", "sound", "alert"],
  //   },
  // },
};

export default config;
