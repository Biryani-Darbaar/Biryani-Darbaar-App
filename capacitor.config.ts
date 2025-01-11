import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.biryaani.app",
  appName: "foodhut",
  webDir: "dist",
  server: {
    url: "http://192.168.29.143:5173/",
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
