# Pollution Tracker

A simple weather app which also keeps track of the air pollution levels you are exposed to and shows your average amount of exposure per day for the current week. Uses GPS for tracking positions. The app will keep track of your position and save your current pollution level along with a timestamp. Tracking occurs every fifth minute (not implemented yet) to ensure that your data is accurate. This data is stored locally on your device and used to calculate average pollution levels for your position. Currently it can show the average pollution level for your most recent position (24 hours) and display the average pollution level for each day this week. Future days will show "TBA" until data exists. 

## Requirements

* React native: 0.63.2 
* Expo: 42.0.1

## Installation

If you have not installed react native and expo do so by following these guides [https://reactnative.dev/, https://docs.expo.dev/get-started/installation/]. Then run `npm install` in the folder where you cloned the repository. 

The app uses https://openweathermap.org/api as its data source. To access the API a key must be provided. This can be done by creating a free account on their website. Once you have your private key create a file called `Local_Key.js` and put it under `./backend/` and add the following line:       

    export const OPENWEATHERMAP_API_KEY = "put_you_api_key_here";

This will ensure that the app finds your private key.

## Running the application

To start the application open up a terminal where you can access expo and navigate to the project folder. Once in the folder, simply write `expo start`. A local server will then start and you have two options: Scan the QR code with your mobile with the app Expo Go or navigate to the local server in your browser. The url will be above the QR code (normally it is `http://localhost:19002`). From here you can choose in the sidebar whether you want to run it as a android emulator, iOS simulator or in the web browser. If you do not know how to connect an emulator I suggest running it in the browser. Using web developer tools in your browser you should be able to view it like a mobile application. (`CTRL + SHIFT + M` in firefox)

~~In App.js there is a call to databse.init(). When "test" is sent as a parameter the application will use the data in backend/TestData.js. Otherwise it will use AsyncStorage to store data locally in either the browser or the phone/simulator.~~

The app is currently hardwired to use the testData since local storage is experiencing bugs. Testing is also limited when using expo since the phone needs to be connected to the same network as the server, making it hard to change physical location. 

## Known issues:

Here follows a list of things that are not fully working or has known bugs:

* The pollutionList is accessable outside of PollutionHistoryClass which it should not be.
* All methods are not currently tested.
* Local storage is not working properly on web and is inconsistent on phone.
