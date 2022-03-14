import { submitForm} from './request'
import { form, aboutMyTrip, restoreData, deleteMyTrip} from './execution'

export function loadApp(){
    console.log('Hello')
    form.addEventListener('submit', submitForm);

    const tripCard = document.querySelector(".trip__record");
    tripCard.addEventListener("click", (event) => deleteMyTrip(event, aboutMyTrip));
    restoreData(aboutMyTrip);
}


