# weathering
A simple weather application for android.

## Issue Tracker
This is a mirror and the issue tracker is available at the main repository:
https://bitbucket.org/schemar_team/weathering.git

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
To access the application in a browser:
```bash
$ ionic serve
```

To build or emulate the android version:
```bash
$ ionic cordova build android
$ ionic cordova emulate android
```

### Troubleshooting
#### Arch linux
- libGL errors
  - Problem: Android comes with its own libstdc++ that does not work.
  - Solution: `sudo mv /opt/android-sdk/emulator/lib64/libstdc++{,_backup}`
  - Explanation: Renaming the directory forces the emulator to use the version that is installed system-wide.
