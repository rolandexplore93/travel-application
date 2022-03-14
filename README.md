# travel-application
This web application allows you to schedule your future trip

# Project description
This travel application allows you to schedule a trip from your location to another country. Additionally, you will receive weather information about your destination, your trip duration and the number of days remaining for your trip to commence.

### Project procedures
These steps give hint on how to go about this travel application

// Project architecture: Create your src folder having server and client folder. Server side files should be inside the server folder while client side files (Js, Media, Styles, Views [html files]) should be inside the client folder
// Set up package.json using 'git init' and install npm packages needed for this Project
// Set up webpack to get the application running on localhost, webpack-development and webpack-production
// Install url-loader in webpack to process images as base64 strings
// Install CopyWebpackPlugin to copy all images into the dist folder
// Apply styles to webpage

// Start writing the functionalities
// Get the following input from the user (location from, location to, departure and return date)
// Estimate the trip duration and the number of days left before the trip commences
// Use user locationTo to get the latitude, longitude, country of that location from geonames API
// Use user locationFrom to get the country where user is coming from geonames API
// Use daysRemainingToStartTrip result and country name data from geonames API to get weather forecast from weatherbit API (16 days weather forecast)
// Set weather condition if the days daysRemainingToStartTrip is >= 15
//// If daysRemainingToStartTrip >=, show weatherbit data forecast for day 16
//// else show weatherbit data forecast for each day
// Use destination country name data from geonames API to get country currency and population from Rest Countries API
// Use locationTo and country name data from geonames API to get the destination image from pixabay api
// Update the user interface with information received
// Automatically reset form after each trip request

// Save trip ticket to device local storage
// Enable user to delete ticket from UI and once that is true, ticket should automatically be removed from local storage

