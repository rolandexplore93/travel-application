import { displayTripToUI } from './request'

//Trip form from html
export const form = document.querySelector('.bookTrip');
// console.log(form)
const futureTrip = document.querySelector('.trip__record');
// console.log(futureTrip)

export const aboutMyTrip = [];
// console.log(aboutMyTrip)


// Estimate the trip duration
export function tripDuration(){
    const departDate = form.querySelector('#departing').value;
    const returnDate = form.querySelector('#returnDate').value;

    // Get full date
    const departureDate = new Date(departDate);
    const returningDate = new Date(returnDate);

    // Convert 1 day to seconds = 86,400,000
    const oneDayToSeconds = 86400000
    //  Convert departure Date to seconds
    const dDate = departureDate.getTime();
    //  Convert return Date to seconds
    const rDate = returningDate.getTime();

    // Get trip duration
	const checkTripDuration = Math.ceil((rDate - dDate) / oneDayToSeconds + 1);

    // Confirm if the trip duration is less than one
	if (checkTripDuration < 1) {
		alert('Your return date cannot be before your start date!');
        console.log("Invalid return date")
	} else {
        console.log("Trip duration: " + checkTripDuration + " days");
    }
	return checkTripDuration;
}

// No. of days between the trip start date and today
export function daysToTrip(){
    const departDate = form.querySelector('#departing').value;
    // Get full date in seconds
    const departureDate = new Date(departDate).getTime();
    // console.log(departureDate)
    const todayDate = new Date().getTime();
    // console.log(todayDate)
    
    // Conversion of 1 day to seconds = 86,400,000
    const oneDayToSeconds = 86400000

    // Get trip duration
	const daysRemainingToStartTrip = Math.ceil((departureDate - todayDate) / oneDayToSeconds);
    // Confirm if the daysRemainingToStartTrip is less than 0
	if (daysRemainingToStartTrip < 0) {
		alert('Departure date cannot be in the past!');
        console.log("Invalid departure date");
	} else {
        console.log("Days left to start trip: " + daysRemainingToStartTrip + " days");
    }
	return daysRemainingToStartTrip;
}


// Generate trip data and make a POST request to the server to generate trip data from api
export const tripInformation = async (locationTo, locationFrom, departureDate, returnDate ) => {
    const daysRemainingToStartTrip = daysToTrip();
    const checkTripDuration = tripDuration();

    // POST request to the server
    const sendTripInfo = await postData('http://localhost:8000/mytrip', {
        locationTo: encodeURIComponent(locationTo),
        locationFrom: encodeURIComponent(locationFrom),
        departureDate: departureDate,
        returnDate: returnDate,
        tripDuration: checkTripDuration,
        daysRemainingToStartTrip: daysRemainingToStartTrip
    });

    const tripFeedback = {
        id: Date.now(),
        locationFrom,
        locationTo,
        departureDate,
        returnDate,
        checkTripDuration,
        daysRemainingToStartTrip,
        destinationCountry: sendTripInfo.tripDataInformation.destinationCountry,
        userCountry: sendTripInfo.tripDataInformation.userCountry,
        photoAddress: sendTripInfo.tripDataInformation.photoAddress,
        currencyName: sendTripInfo.tripDataInformation.currencyName,
        currencySymbol: sendTripInfo.tripDataInformation.currencySymbol,
        population: sendTripInfo.tripDataInformation.population,

        weather: {
            temperature: sendTripInfo.tripDataInformation.weather.temperature,
            highTemperature: sendTripInfo.tripDataInformation.weather.highTemperature,
            lowTemperature: sendTripInfo.tripDataInformation.weather.lowTemperature,
            description: sendTripInfo.tripDataInformation.weather.description,
        }
    }

    aboutMyTrip.push(tripFeedback);  //Store tripFeedback into a new container
    console.log(aboutMyTrip)
// Save trip to device local storage
    saveTripDataToLocalStorage(aboutMyTrip);


    return tripFeedback;
}


// post data to the server
const postData = async(url = '', data = {}) => {
    console.log(url, data)
    try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			// Body data type must match "Content-Type" header
			body: JSON.stringify(data),
		});
		const newData = await response.json();
		console.log(newData);
		return newData;
	} catch (error) {
		//Appropriately handles the error;
		console.log('error', error);
		return error;
	}
}

// saveTripDataToLocalStorage
function saveTripDataToLocalStorage(aboutMyTripInfo){
    localStorage.setItem("tripInfo", JSON.stringify(aboutMyTripInfo))
    console.log("Saved successfully to local storage")
}

// Restore Trip Data saved in local storage to the webpage when the page is reload
export async function restoreData(data){
    console.log("Data resoration from device local storage in process!!!")
    // Data retrieval from ls
    // Transform JSON string from local storage to javascript object using parse()
    const currentData = JSON.parse(localStorage.getItem("tripInfo"));
    console.log(currentData);
    console.log(currentData.length);

    if(currentData.length){
        data.push(...currentData);
        // Map through each item in local storage and recreate a trip card to be display on the webpage
        // displayTripToUI(data)
        data.map((dat) => {
            displayTripToUI(dat)
        })
    }
}


// Delete trip
export function deleteMyTrip(event, data){
    // target individual trip card element
    console.log(data)
    if(event.target.matches(".remove__trip")){
        console.log("This is the remove button")

        if (confirm("Are you sure you want to delete this Trip?")){
            event.target.closest(".trip__card").remove();
            // console.log(event.target.closest(".trip__card"))
            alert("TRIP DELETED SUCCESSFULLY");
        }
        
    } 

    data = data.filter((dat) => {
        // return each trip id as an integer using parseint()
		dat.id == parseInt(event.target.value);
        console.log(dat.id)
        return
	});

    // console.log(data)
    saveTripDataToLocalStorage(data)

}






// This removes items from local storage
// function deleteFromls(){
//     localStorage.removeItem("data")
// }
// deleteFromls()
