import { OPENWEATHERMAP_API_KEY } from './Local_Key.js'

export function getCurrentWeather(latitude, longitude) {
    return fetchJson(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`)
}

export function getAirPollution(latitude, longitude) {
    return fetchJson(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}`)
}

function fetchJson(url) {
    return fetch(url)
        .then(checkForErrors)
        .then(response => response.json())
        .catch(error => console.error(error))
}

function checkForErrors(response) {
    if (!response.ok) {
        throw Error(`HTTP-Error: ${response.status} | ${response.statusText}`)
    }
    return response;
}

export async function getPosition(success) {
    navigator.geolocation.getCurrentPosition(success, () => { console.error(`ERROR: ${err.message}`); });
    /* let { status } = await Location.requestForegroundPermissionsAsync();
     console.log("STATUS: ");
     console.log(status);
     if (status !== "granted") { return }
 
     let location = await Location.getCurrentPositionAsync();
     console.log("LCATION: ");
     console.log(location);
     return location;*/
}

