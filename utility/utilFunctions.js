export function findNearestMonday(unixtime) {
    let localDate = new Date(unixtime * 1000);
    let day = localDate.getDay() == 0 ? 7 : localDate.getDay() - 2;

    console.log(localDate.getDate());
    localDate.setDate(localDate.getDate() - day);
    localDate.setHours(0, 0, 0, 0);

    return localDate.getTime() / 1000;
}

export function findNearestIndex(unixtime, array) {
    let index = binaryIndexSearch(unixtime, array, 0);
    return index >= array.length ? null : index;

}

function binaryIndexSearch(value, array, indexCounter) {
    let mid = Math.floor(array.length / 2);
    if (array.length == 0) { return indexCounter }
    if (array[mid].time <= value) { return binaryIndexSearch(value, array.slice(mid + 1, array.length), indexCounter + mid + 1) } //Maybe out of scope if last? then null 
    if (array[mid].time >= value) { return binaryIndexSearch(value, array.slice(0, mid), indexCounter) }
}
