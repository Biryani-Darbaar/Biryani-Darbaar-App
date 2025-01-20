import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.biryani.app",
  appName: "foodhut",
  webDir: "dist",
  server: {
    url: "http://192.168.0.110:5173/",
  },
  plugins: {
    FirebaseMessaging: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
