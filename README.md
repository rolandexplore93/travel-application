# Travel-application
This travel application allows you to schedule your future trip from your location to your destination. Additionally, you will receive the weather information about the destination, destination's country, country population & currency, your trip duration and the number of days remaining for your trip to commence.

## Dependencies
This project runs on [Node.js](https://nodejs.dev/) environment (version 17 and above) and uses [Express](https://expressjs.com/) to run server and routes. Many dependencies were used to get this project function and some of which are cors() for cross-origin allowance, body-parser as middleware, [Axios](https://www.npmjs.com/package/axios) to make an API call from the server and [Webpack](https://webpack.js.org/). Other dependencies include;

dompurity: To sanitize html and prevent XSS attacks

dotenv: To configure the environment variable to hide api keys from public

workbox-webpack-plugin: For offline functionality

jest: To test the functionalities

file-loader | sass-loader | node-sass | css-loader | style-loader | html-loader | html-webpack-plugin

## API Used
This project uses 4 external API to generate various information about the user destination. They are:
1. [GeoNames](https://www.geonames.org): To get the latitude, longitude and the country the user is visiting
2. [WeatherBit](https://www.weatherbit.io): To get the temprature of the the country the user is visiting
3. [RestCountries](https://restcountries.com/#api-endpoints-v2-name): To get currency and population of the country that the user is going to
4. [Pixabay](https://pixabay.com/api/docs/): To get the image of the user's destination

- Sign up on each API website to get an API key that will be used to make an API call
- Hide your API keys in the .env file created in your project root folder

## Functionality Testing
* Install [jest](https://jestjs.io/) using "npm install --save-dev jest"
* In package.json file, add to your script, { "test": "jest" }
* type "npm test" to run test

## How to run travel-application in development mode
* Set up webpack.dev.js file for development
* In package.json file, add to your script, { "build-dev": "webpack-dev-server  --config webpack.dev.js --open" }
* run "npm run build-dev" on your terminal to start development mode
* App opens in a new port 8080

## How to run travel-application in production mode
* Set up webpack.prod.js file for development
* In package.json file, add to your script, { "build-prod": "webpack --config webpack.prod.js" }
* run "npm run build-prod" on your terminal to start production mode
* App runs on the localhost port (8000) set in the server file

## Files ignored
The following files are not pushed to Github
* node_modules
* dist
* .env
