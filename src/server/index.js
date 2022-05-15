// Configure the environment variable to hide api keys from public
const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
// Configure express to run server and routes
const express = require('express');
//Set up cors for cross-origin allowance
const cors = require('cors');
// Allow express to use body-parser as middleware
const bodyParser = require('body-parser');
// Axios to make API requests
const axios = require('axios');
// Configure the application to use express
const app = express();
// Initialize the main project project using path.resolve()
app.use(express.static(path.resolve("dist")));
// app.use(express.static(path.resolve(__dirname, "../src/views/index.html")));
console.log(__dirname)

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

// Set up the server at port 8000
const port = process.env.PORT || 8000;


const server = app.listen(port, function listener(){
    console.log("Server is working at port: " + port);
});

// jest needs an asynchronous function server to work 
// Server error obtained during JEST TESTING: Cannot log after tests are done. Did you forget to wait for something async in your test?
// Attempted to log "Server is working at port: 8000".
// SOLUTION: read the server comment above and run this code below when testing 
// (async function () {
//     // const server = await app.listen(port);
//     // console.log('Server started on port: ' + port)
//     const server = app.listen(port, function listener(){
//         console.log("Server is working at port: " + port);
//     });
// })

app.get('/', (req, res) => {
    // res.sendFile(path.resolve('src/client/views/index.html'));
    res.sendFile('dist/index.html')
});

const GEONAMES_APIKEY = 'rolandexplore93';
const WEATHERBIT_APIKEY = '363a618d9ba64b35a0d136457f32956f';
const PIXABAY_APIKEY = '25980875-6c6d122a3737d279b8daf3a97';

// Receive trip informatiom from the client side and make an api call 
app.post('/mytrip', handleTripRequest)

// handleTripRequest to get data from the APIs
async function handleTripRequest(request, response){
    console.log(request)
    // Empty object to store the infortation obtained
    const tripDataInformation = {}

    const locationTo = request.body.locationTo;
    const locationFrom = request.body.locationFrom;
    const departureDate = request.body.departureDate;
    const returnDate = request.body.returnDate;
    const tripDuration = request.body.tripDuration;
    const daysRemainingToStartTrip = request.body.daysRemainingToStartTrip

    console.log(locationTo, locationFrom, departureDate, returnDate, tripDuration, daysRemainingToStartTrip)

    // send an error message if any of the field is empty
    if (!locationTo || !locationFrom || !departureDate || !returnDate){
        console.log(response.status(400).send({
            error: "Input is not valid"
        }));
    } 

    // Get the api key to make an api call
    // const callToGeonames = GEONAMES_APIKEY;
    // const callToWeatherbit = WEATHERBIT_APIKEY;
    // const callToPixabay = PIXABAY_APIKEY;

    try {
        const dataFromGeoNames = await getGeoNamesData(GEONAMES_APIKEY, locationTo);
        const userExitLocation = await userExitLocationData(GEONAMES_APIKEY, locationFrom)
        const WeatherBitData = await getDataFromWeatherBit(dataFromGeoNames.lat, dataFromGeoNames.lon, WEATHERBIT_APIKEY, daysRemainingToStartTrip);
        const countryAttr = await getCountryAttr(dataFromGeoNames.country)
        // user destination image
        const photoAddress = await destinationImage(PIXABAY_APIKEY, locationTo, dataFromGeoNames.country);

        tripDataInformation.destinationCountry = dataFromGeoNames.country;
        tripDataInformation.userCountry = userExitLocation.countryFrom;
        tripDataInformation.weather = WeatherBitData;
        tripDataInformation.photoAddress = photoAddress;
        tripDataInformation.currencyName = countryAttr.currencyName;
        tripDataInformation.currencySymbol = countryAttr.currencySymbol;
        tripDataInformation.population = countryAttr.population

        // response.send(tripDataInformation);
        response.status(200).json({
            status: "success",
            message: "post request received successfully",
            tripDataInformation: tripDataInformation
        })

        console.log(tripDataInformation);


    } catch (error){
        console.log("error", error)
		return response.status(500).send({ error: 'Internal server error!!!' });
    }


}



// getGeoNamesData
async function getGeoNamesData(username, locationTo){
    const apiurl = `http://api.geonames.org/searchJSON?q=${locationTo}&maxRows=1&username=${username}`;
	const res = await axios.get(apiurl);
    // console.log(res.data)
    const dataFromGeoNames = {
        lat: res.data.geonames[0]?.lat,
		lon: res.data.geonames[0]?.lng,
		country: res.data.geonames[0]?.countryName,
    }
    // console.log(dataFromGeoNames)
    return dataFromGeoNames;
}

// getGeoNamesDataOfExitLoc
async function userExitLocationData(username, locationFrom){
    const apiurl = `http://api.geonames.org/searchJSON?q=${locationFrom}&maxRows=1&username=${username}`;
	const res = await axios.get(apiurl);
    // console.log(res.data)
    const userExitPoint = {
		countryFrom: res.data.geonames[0]?.countryName,
    }
    // console.log(userExitPoint)
    return userExitPoint;
}

// Get destination country currency and currency symbol from Restcountries api
// https://restcountries.com/v3.1/name/{name}

async function getCountryAttr(country){
    const apiurl = `https://restcountries.com/v3.1/name/${country}`;

    const res = await axios.get(apiurl);
    // console.log(res.data[0]?.currencies)
    // Use Object.values() to convert object to array
    // console.log(Object.values(res.data[0]?.currencies)[0].name)
    // console.log(Object.values(res.data[0]?.currencies)[0].symbol)

    const count = {
        currencyName: Object.values(res.data[0]?.currencies)[0].name,
        currencySymbol: Object.values(res.data[0]?.currencies)[0].symbol,
        population: res.data[0]?.population
    }

    return count

}

// Use the latitude and longitude information received from getGeoNamesData() to get the weather information of user destination
async function getDataFromWeatherBit(latitude, longitude, apikey, dayforecast){
	const apiurl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apikey}`;

    // Set custom condition to use day 15 weather information if the daysRemainingToStartTrip is beyond 15 days
    if (dayforecast >= 15){
        dayforecast = 15
    }

    const res = await axios.get(apiurl);
    // console.log(res.data);
    // console.log(res.data.data[dayforecast]);

    const dataFromWeatherBit = {
		temperature: res.data.data[dayforecast]?.temp,
		highTemperature: res.data.data[dayforecast]?.high_temp,
		lowTemperature: res.data.data[dayforecast]?.low_temp,
		description: res.data.data[dayforecast]?.weather.description,
	};
    // console.log(dataFromWeatherBit);
	return dataFromWeatherBit;
}

// Get location image from pixabay api
// if location exist in pixabay api, return the location image; else, return the location country image
async function destinationImage(apikey, locationTo, locationCountry){
    const locationToUrl = `https://pixabay.com/api/?key=${apikey}&q=${encodeURIComponent(locationTo)}&image_type=photo`;
    const locationCountryUrl = `https://pixabay.com/api/?key=${apikey}&q=${encodeURIComponent(locationCountry)}&image_type=photo`;

    const res = await axios.get(locationToUrl);
    // console.log(res.data)
    // if location exist in pixabay api, return the location image; 
    let imageAddress = res.data.hits[0]?.webformatURL;
    // otherwise, return the location country image
    if (!imageAddress){
        const res = await axios.get(locationCountryUrl);
        imageAddress = res.data.hits[0]?.webformatURL;
    }
    // console.log(imageAddress)
    return imageAddress;
}