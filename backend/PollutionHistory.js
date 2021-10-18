import AsyncStorage from "@react-native-async-storage/async-storage";
import { TestData } from "./TestData";

//import * as SecureStore from 'expo-secure-store';

export class PollutionHistory {
    constructor() {
        this.pollutionList = TestData;
    }

    async init(test) {  //Maybe add path to directory where saved here? Default same as earlier.
        //Maybe add a timer which timeouts after 5-10 sec returning false.
        if (test == "test") {
            this.pollutionList = TestData;
        } else {
            this.pollutionList = await this.loadDataFromStorage("pollutionData");
            console.log("OG LIST: ");
            console.log(this.pollutionList);
            return true;
        }

    }

    getLatestPollution() {
        console.log("GetlAtestpoliution");
        console.log(this.pollutionList);
        console.log(this.pollutionList.length);
        console.log(this.pollutionList.length - 1);
        console.log(this.pollutionList[this.pollutionList.length - 1]);
        console.log(this.pollutionList.length == 0);
        return this.pollutionList.length == 0 ? [] : this.pollutionList[this.pollutionList.length - 1];
    }

    async loadDataFromStorage(key) {
        try {
            let data = await AsyncStorage.getItem(key); //Possibly return written
            console.log("Loaded data: ");
            console.log(data);
            return JSON.parse(data);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async writeDataToStorage(key, value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value)); //Possibly return written}
        } catch (error) {
            console.error(error);
        }
    }

    add(unixtime, aqi) {
        this.pollutionList.push({ time: unixtime, aqi: aqi })
        console.log(this.pollutionList);
        this.writeDataToStorage("pollutionData", this.pollutionList);
    }

    getAveragePollution(unixtime) { //Somehow gives values in the future. 
        const A_DAY_IN_UNIX_TIME = 24 * 60 * 60;

        let array = this.pollutionList;

        let startIndex = this.findNearestIndex(unixtime, array);
        let maxAllowedTimeValue = array[startIndex].time + A_DAY_IN_UNIX_TIME;
        let totalAqiScore = 0;

        for (let i = startIndex; array[i].time < maxAllowedTimeValue; i++) {
            if (i + 1 < array.length && array[i + 1].time < maxAllowedTimeValue) {
                totalAqiScore += array[i].aqi * (array[i + 1].time - array[i].time);
            } else {
                totalAqiScore += array[i].aqi * (maxAllowedTimeValue - array[i].time);
            }
        }
        return (totalAqiScore / A_DAY_IN_UNIX_TIME).toPrecision(2);
        //(foreach entry within interval(aqi * secondsToNextEntry)) / unix seconds (24 hour) = average Pollution for dat X
    }

    getPollutionWeekChart(unixtime) {
        const A_DAY_IN_UNIX_TIME = 24 * 60 * 60;
        let weekStart = this.findNearestMonday(unixtime);
        let weekData = [];
        for (let i = 0; i < 7; i++) {
            weekData[i] = this.getAveragePollution(weekStart + i * A_DAY_IN_UNIX_TIME);
        }
        console.log("WEEK:");
        console.log(weekData);
        return weekData;
    }

    findNearestMonday(unixtime) {
        let today = new Date(unixtime); //Date seems to be 1 day off.
        let day = today.getUTCDay() == 0 ? 7 : today.getUTCDay() - 1;

        today.setDate(today.getDate() - day);
        today.setHours(0, 0, 0, 0);
        return today.getTime() / 1000;
    }

    findNearestIndex(unixtime, array) {
        return this.binaryIndexSearch(unixtime, array, 0);
    }

    binaryIndexSearch(value, array, indexCounter) {
        let mid = Math.floor(array.length / 2);
        if (array.length == 0) { return indexCounter }
        if (array[mid].time <= value) { return this.binaryIndexSearch(value, array.slice(mid + 1, array.length), indexCounter + mid) }
        if (array[mid].time >= value) { return this.binaryIndexSearch(value, array.slice(0, mid), indexCounter) }
    }

}