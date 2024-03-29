> Archive notes: Vue Native is now defunct. I made this app long ago to teach a co-worker with web dev skills how to easily write cross-platform native apps without having to dig into platform specific toolchains like Xcode and Android Studio.

# Demo Vue Native App
An simple example of using [Vue Native](https://vue-native.io/) to quickly build a cross platform mobile app. Uses native elements + webview to connect to an api and render a simple news reader.

This app is the News section of [Spring Hill News](https://springhillnews.net/) complete with an internal api translation layer.

![](preview.gif)


## Build Setup
Requires NodeJS + NPM (and Xcode if targeting iOS)
* Git clone this repo
* Install all dependencies: `npm install`
* Install Expo: `npm install --global expo-cli`
* To run inside of iOS Simulator: `npm run ios`

## To Build for Production
* iOS: `expo build:ios`
* Android: `expo build:android -t apk`
