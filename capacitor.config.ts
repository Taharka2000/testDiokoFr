import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'dist',
  plugins: {
    Camera: {
      permissions: ['camera'], // Autorise l'utilisation de la caméra
    },
  },
  
};

export default config;
