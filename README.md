![Logo](resources/android/icon/drawable-xhdpi-icon.png)

# Simplest Weather App
A simple weather application for android.

![Screenshot](resources/screenshot.png)

[![Google Play Badge](resources/google-play-badge.png)](https://play.google.com/store/apps/details?id=me.martinschenck.weather)

## Issue Tracker
The issue tracker is available at the main repository:
https://bitbucket.org/schemar/simplest-weather-app

Please also create your pull requests there.

## Running with Ionic CLI
### Prerequisites
- nodejs
- npm
- Android Studio to manage SDKs, AVDs, etc.


Use Android Studio to install an appropriate SDK and virtual device.

### Set-up
```bash
$ sudo npm install -g ionic cordova
$ npm install
```

### Running
#### Browser
To access the application in a browser:
```bash
$ ionic serve
```

#### Android
To build or emulate the android version:
```bash
$ ionic cordova build android
$ ionic cordova emulate android
```

To build a "prod" version:
```bash
$ ionic cordova build android --prod
```

Releases:
```bash
$ ionic cordova build android --prod --release
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <path-to-your-keystore> <path-to-unsigned-apk> <alias-name>
$ zipalign 4 <path-to-unsigned-apk> <path-where-signed-apk-should-be-created>
```

If you need to create a keystore:
```bash
$ keytool -genkey -v -keystore <release-key>.jks -keyalg RSA -keysize 2048 -validity 10000 -alias <alias-name>
```

### Troubleshooting
#### Arch linux
- libGL errors
  - Problem: Android comes with its own libstdc++ that does not work.
  - Solution: `sudo mv /opt/android-sdk/emulator/lib64/libstdc++{,_backup}`
  - Explanation: Renaming the directory forces the emulator to use the version that is installed system-wide.

#### Windows
- zipalign is not recognized as an executable
  - Problem: When you want to use zipalign in the PowerShell, it returns an error that it does not know what zipalign is.
  - Solution: Use `C:\Users\<username>\AppData\Local\Android\sdk\build-tools\<version>\zipalign.exe`
  - Explanation: Tell windows where your zipalign is located. It may be in a different location depending on where you installed Android.
