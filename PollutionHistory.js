export class PollutionHistory {
    constructor() {
        this.pollutionList = this.loadDataFromStorage("pollutionData");
        this.getLatestPollution = this.getLatestPollution;
    }
    pollutionList = []
    A_DAY_IN_UNIX_TIME = 24 * 60 * 60;

    getLatestPollution() {
        this.pollutionList == [] ? [] : this.pollutionList[this.pollutionList.length - 1];
    }

    async loadDataFromStorage(key) {
        try {
            let data = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + key); //Possibly return written
            console.log(data);
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async writeDataToStorage(key, value) {
        let written = await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + key, JSON.stringify(value)); //Possibly return written
        console.log(written);
    }

    add(unixtime, aqi) {
        this.pollutionList.push({ time: unixtime, aqi: aqi })
        this.writeDataToStorage("pollutionData", this.pollutionList);
    }

    getAveragePollution(unixtime, array) {
        let startIndex = this.findNearestIndex(unixtime, this.pollutionList);
        let maxAllowedTimeValue = array[startIndex] + A_DAY_IN_UNIX_TIME;
        let totalAqiScore = 0;
        for (i = startIndex; array[i] < maxAllowedTimeValue; i++) {
            if (i + 1 < array.length && array[i + 1] < maxAllowedTimeValue) {
                totalAqiScore = array[i].aqi * (array[i + 1] - array[i]);
            } else {
                totalAqiScore = array[i].aqi * (maxAllowedTimeValue - array[i]);
            }
        }
        return totalAqiScore / this.A_DAY_IN_UNIX_TIME;
        //(foreach entry within interval(aqi * secondsToNextEntry)) / unix seconds (24 hour) = average Pollution for dat X
    }

    getPollutionWeekChart(unixtime) {
        let weekStart = findNearestMonday(unixtime)
        let weekData = [];
        for (i = 0; i < 7; i++) {
            weekdata[i] = this.getAveragePollution(weekStart + i * A_DAY_IN_UNIX_TIME);
        }
        return weekdata;
    }

    findNearestMonday() {

    }

    findNearestIndex(unixtime, array) {
        return this.binaryIndexSearch(unixtime, array, 0);
    }

    binaryIndexSearch(value, array, indexCounter) {
        let mid = Math.floor(array[array.length]) / 2
        if (array === []) { return indexCounter }
        if (array[mid].time <= value) { this.binarySearch(array.slice(mid + 1, array.length), value, indexCounter + mid) }
        if (array[mid].time >= value) { this.binarySearch(array.slice(0, mid), value, indexCounter) }
    }

}