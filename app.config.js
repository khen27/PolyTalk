import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }) => ({
  ...config,
  ios: {
    ...config.ios,
    bundleIdentifier: 'com.polyai.polytalk',
    infoPlist: {
      ...config.ios?.infoPlist,
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  web: {
    ...config.web,
    build: {
      babel: {
        include: ['./assets/fonts']
      }
    }
  },
  extra: {
    ...config.extra,
    eas: {
      ...config.extra?.eas,
      projectId: '228073db-a7c4-4532-9cc7-f7d6dc2ede48',
    },
  },
  owner: 'appblitz',
  runtimeVersion: {
    policy: 'sdkVersion'
  },
  updates: {
    url: 'https://u.expo.dev/228073db-a7c4-4532-9cc7-f7d6dc2ede48'
  }
});
