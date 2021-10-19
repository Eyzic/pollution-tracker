import { PollutionHistory } from '../backend/PollutionHistory';

let date = new Date("1626213600"); //2021-07-14  00:00:00

const testData = [
    { "aqi": 2, "time": 1625781600 }, //2021-07-14  00:00:00 Thu
    { "aqi": 2, "time": 1625868000 }, //2021-07-10  00:00:00 Fri
    { "aqi": 2, "time": 1625954400 }, //2021-07-11  00:00:00 Sat
    { "aqi": 2, "time": 1626040800 }, //2021-07-12  00:00:00 Sun
    { "aqi": 2, "time": 1626127200 }, //2021-07-13  00:00:00 Mon
    { "aqi": 2, "time": 1626213600 }, //2021-07-14  00:00:00 Tue   Entry point
    { "aqi": 1, "time": 1626300000 }, //2021-07-15  00:00:00 Wed
    { "aqi": 4, "time": 1626386400 }, //2021-07-16  00:00:00 Thu
    { "aqi": 5, "time": 1626472800 }, //2021-07-17  00:00:00 Fri
    { "aqi": 5, "time": 1626559200 }, //2021-07-18  00:00:00 Sat
    { "aqi": 5, "time": 1626645600 }, //2021-07-19  00:00:00 Sun
    { "aqi": 5, "time": 1626732000 }, //2021-07-20  00:00:00 Mon
]

let db = new PollutionHistory();
db.pollutionList = testData;

const validationDataAverage = [
    1626213600,
    2
];


const testData2 = [
    { "aqi": 2, "time": 1625781600 }, //2021-07-14  00:00:00 Thu
    { "aqi": 3, "time": 1625784600 },
    { "aqi": 5, "time": 1625788600 },
    { "aqi": 2, "time": 1625791600 },
    { "aqi": 1, "time": 1625868000 }, //2021-07-10  00:00:00 Fri
]

const validationData2Average = [
    1625781600,
    ((2 * 3000 + 3 * 400 + 5 * 300 + 2 * 76400) / 80100).toPrecision(2) //(for each entry : aqi * (nextTime - thisTime) ) / totalTime
];

export function testGetAveragePollution() {
    db.pollutionList = testData;
    let result = db.getAveragePollution(validationDataAverage[0]) == validationDataAverage[1];

    db.pollutionList = testData2;
    let answer = db.getAveragePollution(validationData2Average[0]);
    let result2 = answer == validationData2Average[1];
    return result && result2;
}



const validationData = [
    1626213600,
    ["2.0", "2.0", "1.0", "4.0", "5.0", "5.0", "5.0"]
];


export function testGetPollutionWeekChart() {
    db.pollutionList = testData;
    let weekChart = db.getPollutionWeekChart(validationData[0]);
    let result = weekChart.toString() === validationData[1].toString();
    return result;

}
