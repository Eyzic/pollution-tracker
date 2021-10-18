import AsyncStorage from "@react-native-async-storage/async-storage";
import { TestData } from "./TestData";
import * as Util from '../utility/utilFunctions';

const A_DAY_IN_UNIX_TIME = 24 * 60 * 60;

export class PollutionHistory {

    //Currently set to TestData permanently since loading from actual storage causes bugs.
    constructor() {
        this.pollutionList = TestData;
    }

    //Maybe add parameter for save location. As Default use same as before.
    async init(test) {
        if (test == "test") {
            this.pollutionList = TestData;
        } else {
            this.pollutionList = await this.loadDataFromStorage("pollutionData");
            return true;
        }
    }

    //Known bug where array.length is 0 while it contains a value. Probably an async problem.
    getLatestPollution() {
        return this.pollutionList.length == 0 ? [] : this.pollutionList[this.pollutionList.length - 1];
    }

    add(unixtime, aqi) {
        this.pollutionList.push({ time: unixtime, aqi: aqi })
        this.writeDataToStorage("pollutionData", this.pollutionList);
    }

    getAveragePollution(unixtime) {
        let array = this.pollutionList;

        let startIndex = Util.findNearestIndex(unixtime, array);
        if (this.checkForIlligalIndex(startIndex, array)) { return "TBA" }

        let intervalEndTime = array[startIndex].time + A_DAY_IN_UNIX_TIME;
        let totalAqiScore = 0;
        let duration = 0;

        for (let i = startIndex; array[i].time < intervalEndTime; i++) {
            if (i + 1 < array.length && array[i + 1].time < intervalEndTime) {
                let elapsedDeltaTime = array[i + 1].time - array[i].time;
                duration += elapsedDeltaTime;
                totalAqiScore += array[i].aqi * elapsedDeltaTime;
            } else {
                let elapsedDeltaTime = intervalEndTime - array[i].time;
                duration += elapsedDeltaTime;
                totalAqiScore += array[i].aqi * elapsedDeltaTime;
            }
            if (i <= array.length) { break; }
        }
        return (totalAqiScore / duration).toPrecision(2);
    }

    checkForIlligalIndex = (startIndex, array) => startIndex >= array.length || startIndex == null;

    getPollutionWeekChart(unixtime) {
        let weekStart = Util.findNearestMonday(unixtime);
        let weekData = [];
        for (let i = 0; i < 7; i++) {
            weekData.push(this.getAveragePollution(weekStart + i * A_DAY_IN_UNIX_TIME));
        }
        return weekData;
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

}