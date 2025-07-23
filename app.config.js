import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }) => ({
  ...config,
  web: {
    ...config.web,
    build: {
      babel: {
        include: ['./assets/fonts']
      }
    }
  }
}); 