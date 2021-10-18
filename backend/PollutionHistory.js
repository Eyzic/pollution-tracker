import AsyncStorage from "@react-native-async-storage/async-storage";
import { TestData } from "./TestData";
import * as Util from '../utility/utilFunctions';

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

    //Could be moved to a db-file.

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

        let startIndex = Util.findNearestIndex(unixtime, array);
        if (startIndex >= array.length || startIndex == null) { return "TBA" }

        let maxAllowedTimeValue = array[startIndex].time + A_DAY_IN_UNIX_TIME;
        let totalAqiScore = 0;
        let duration = 0;

        for (let i = startIndex; array[i].time < maxAllowedTimeValue; i++) {
            if (i + 1 < array.length && array[i + 1].time < maxAllowedTimeValue) {
                let timeDiff = (array[i + 1].time - array[i].time);
                duration += timeDiff;
                totalAqiScore += array[i].aqi * timeDiff;
            } else {
                let timeDiff = (maxAllowedTimeValue - array[i].time);
                duration += timeDiff;
                totalAqiScore += array[i].aqi * timeDiff;
            }
            if (i <= array.length) { break; }
        }
        return (totalAqiScore / duration).toPrecision(2);
    }

    getPollutionWeekChart(unixtime) {
        const A_DAY_IN_UNIX_TIME = 24 * 60 * 60;
        let weekStart = Util.findNearestMonday(unixtime);
        console.log("WEEK TIME");
        console.log(weekStart);
        let weekData = [];
        for (let i = 0; i < 7; i++) {
            weekData.push(this.getAveragePollution(weekStart + i * A_DAY_IN_UNIX_TIME));
        }
        console.log("WEEK:");
        console.log(weekData);
        return weekData;
    }
}