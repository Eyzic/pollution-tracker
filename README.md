# Pollution Tracker

A simple weather app which also keeps track of the air pollution levels you are exposed to and warns you if you enter areas which have high pollution levels. Uses GPS for tracking positions.

## Requirements

* React native: x.x 
* Expo: x.x

## Installation

If you have not installed react native and expo do so by following these guides [link, link]. TBC
The app uses https://openweathermap.org/api as its data source. To access the API a key must be provided. This can be done by creating a free account on their website. Once you have your private key create a file called `Local_Key.js` at the root level of the repo and add the following line:       

    export const OPENWEATHERMAP_API_KEY = "put_you_api_key_here";

This will ensure that the app finds your private key.

## Running the application


To start the application open up a terminal where you can access expo and navigate to the project folder. Once in the folder, simply write `expo start`. A local server will then start and you have two options: Scan the QR code with your mobile with the app Expo Go or navigate to the local server in your browser. The url will be above the QR code (normally it is `http://localhost:19002`). From here you can choose in the sidebar whether you want to run it as a android emulator, iOS simulator or in the web browser. If you do not know how to connect an emulator I suggest running it in the browser. Using web developer tools in your browser you should be able to view it like a mobile application. (`CTRL + SHIFT + M` in firefox)

In App.js there is a call to databse.init(). When "test" is sent as a parameter the application will use the data in backend/TestData.js. Otherwise it will use AsyncStorage to store data locally in either the browser or the phone/simulator.

## Known bugs

Here follows a list of things that are not fully working or has known bugs:

* Local storage seems to work on mobile but not in the browser
* The date is sometimes not correct
* The AveragePollution function seems to return average values for future days.
