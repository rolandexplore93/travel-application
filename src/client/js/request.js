import { form, tripDuration, daysToTrip, tripInformation } from './execution'
// import DOMPurify to sanitize the HTML and prevents XSS attacks
import DOMPurify from 'dompurify';

export async function submitForm(evt){
    evt.preventDefault();
    const locationFrom = form.querySelector('#locationFrom').value.trim();
    const locationTo = form.querySelector('#locationTo').value.trim();
    const departureDate = form.querySelector('#departing').value;
    const returnDate = form.querySelector('#returnDate').value;
    console.log(locationFrom)
    console.log(locationTo)
    console.log(departureDate)
    console.log(returnDate)

    // tripDuration();
    // daysToTrip();
    tripInformation(locationTo, locationFrom, departureDate, returnDate)
    .then(data => {
        console.log(data);
        displayTripToUI(data);

    })
    .catch(error => {
        console.log("Error! Please, enter correct information", error)
    })
    .then(() => formResetToDefault())



}

// export function errorHandling(error){
//     alert('This request cannot be processed. Please, check if you entered the correct input', error);
//     console.log("error", error);
// }

export const displayTripToUI = async(updateTrip) => {
    
    const customHTML = `
        <div class="trip__card" id="${updateTrip.id}">
            <div class="card__header">
                <i class="fas fa-plane-departure fa-2x"></i>
                <p>Your Trip To <span id="loc"> ${updateTrip.locationTo},${updateTrip.destinationCountry}</span> is <span id="days-left">${updateTrip.daysRemainingToStartTrip}</span> Days Away</p>
                <i class="fas fa-igloo fa-2x" aria-hidden="true"></i>
            </div>
            <div class="trip__details">
                <div class="trip__destination">
                    <img src="${updateTrip.photoAddress}" alt="user-destination-image" width="200" height="200">
                    <p class="" id="about-country"><span>${updateTrip.locationTo},${updateTrip.destinationCountry}</span><span>Temperature: ${updateTrip.weather.temperature} degrees</span><span>High: ${updateTrip.weather.highTemperature} degrees</span><span>Low: ${updateTrip.weather.lowTemperature} degrees</span></p>
                    <p id="currency">Currency: <span id="currency-name">${updateTrip.currencyName}</span> (<span id="currency-symbol">${updateTrip.currencySymbol}</span>)</p>
                    <p id="population">Population: <span id="country-population">${updateTrip.population}</span></p>
                    <p id="country-weather">Weather description: <span id="weather-description">${updateTrip.weather.description}</span></p>
                </div>
                <div class="trip__order">
                    <p>From: <span id="from-country">${updateTrip.locationFrom}</span></p>
                    <p>To: <span id="to-country">${updateTrip.locationTo}</span></p>
                    <p id="departure">DEPARTURE DATE</p>
                    <p id="departure-date">${updateTrip.departureDate}</p>
                    <p id="return">RETURN DATE</p>
                    <p id="return-date">${updateTrip.returnDate}</p>
                    <p id="duration">Your trip duration is <span>${updateTrip.checkTripDuration} days</span></p>
                </div>
            </div>
            <div class="trip__extra">
                <button class="item lodging__info">+ Add Lodging Info</button>
                <button class="item packing__list">+ Add Packing List</button>
                <button class="item notes">+ Add Notes</button>
            </div>
            <div class="trip__decision">
                <button class="trip__decide save__ticket">Save Ticket</button>
                <button class="trip__decide remove__trip" id="remove-trip">Remove Trip</button>
            </div>
        </div>
    `
    // Apply DOMPurify to protect the html
    const purifyCustomHtml = DOMPurify.sanitize(customHTML);
	const documentFragment = document
		.createRange()
		.createContextualFragment(purifyCustomHtml);
    
    const displayTripOnUI = document.querySelector('.trip__record'); 

    displayTripOnUI.appendChild(documentFragment);

}

// User input to be deleted when user click on clear
const clearInput = document.getElementById("clearTrip");
clearInput.addEventListener("click", function(e){
    e.preventDefault()
    const form = document.querySelector('.bookTrip');
    form.reset()
})

// formResetToDefault
const formResetToDefault = async () => {
    const form = document.querySelector('.bookTrip');

    setTimeout(function clearForm(){
        form.reset()
    }, 3000);
}




