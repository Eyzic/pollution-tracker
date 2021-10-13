import { OPENWEATHERMAP_API_KEY } from './Local_Key.js'

export function getCurrentWeather(latitude, longitude) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            else { throw error(response.status); }
        })
}

export function getAirPollution(latitude, longitude, current_timestamp) {
    return fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}`)
        .then(response => {
            if (response.status == 200) {
                return response.json();

            }
            else { throw error(response.status); } //Gör ett ordentligt error
        })
}

export function getPosition(success) {
    navigator.geolocation.getCurrentPosition(success, () => { console.warn(`ERROR: ${err.message}`); });
}

