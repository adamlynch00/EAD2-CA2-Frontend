/** @type {Detox.DetoxConfig} */
module.exports = {
  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug'
    },
    // ...
  },
  // ...

  testRunner: {
    $0: 'jest',
    args: {
      config: 'e2e/jest.config.js',
      _: ['e2e'],
    },
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? 'failing' : undefined,
      screenshot: 'failing',
    },
  },
  apps: {
    
    'android.debug': {
      type: 'android.apk',
      build:
        'cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release && cd ..',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
    },
  },

  "devices": {
    "emulator": {
        "type": "android.emulator", // or "android.emulator", or etc...
         "device": { "avdName": "Pixel_4_API_30" }, // or e.g.: { "avdName": "Pixel_API_29" }
       }
     },
  
  configurations: {
    
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
  },
};