import * as Location from 'expo-location';

export function findNearestMonday(unixtime) {
    let date = new Date(unixtime * 1000);
    let day = date.getDay() == 0 ? 7 : date.getDay() - 2;

    date.setDate(date.getDate() - day);
    date.setHours(0, 0, 0, 0);

    return date.getTime() / 1000;
}

export function findNearestIndex(unixtime, array) {
    let index = binaryIndexSearch(unixtime, array, 0);
    return index >= array.length ? null : index;

}

function binaryIndexSearch(value, array, indexCounter) {
    let mid = Math.floor(array.length / 2);
    if (array.length == 0) { return indexCounter }
    if (array[mid].time <= value) { return binaryIndexSearch(value, array.slice(mid + 1, array.length), indexCounter + mid + 1) }
    if (array[mid].time >= value) { return binaryIndexSearch(value, array.slice(0, mid), indexCounter) }
}


export async function refreshLocation() {
    if (checkLocationPermissions()) {
        let location = await Location.getCurrentPositionAsync({});
        return location;
    }
    console.error("Permissions for location denied!");
}

async function checkLocationPermissions() {
    let { permission } = Location.getBackgroundPermissionsAsync();
    if (!permission) {
        let { request } = Location.requestBackgroundPermissionsAsync();
        if (request !== 'granted') { return false; }
    }
    return true;
}

export function convertUnixTimeToDate(unixtime) {
    let date = new Date(unixtime * 1000);
    let hours = leftPad(date.getUTCHours(), 2);
    let minutes = leftPad(date.getUTCMinutes(), 2);

    let timeInDateFormat = `${hours}:${minutes}`;

    return timeInDateFormat;
}

export function getFormattedDate(date) {
    let monthName = ["January", "Februrary", "March", "April", "June", "July", "August", "September", "October", "November", "December"]
    let formattedDate = `${date.getUTCDate()} ${monthName[date.getMonth() - 1]} - ${date.getFullYear()}`;
    return formattedDate;
}

const leftPad = (value, length) => value.toString().length < length ? leftPad("0" + value, length) : value;