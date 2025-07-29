import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }) => ({
  ...config,
  ios: {
    ...config.ios,
    bundleIdentifier: 'com.polyai.polytalk',
  },
  web: {
    ...config.web,
    build: {
      babel: {
        include: ['./assets/fonts']
      }
    }
  }
});
