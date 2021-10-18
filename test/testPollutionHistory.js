import * as Util from '../utility/utilFunctions';
import { PollutionHistory } from '../backend/PollutionHistory';

let date = new Date("1626213600"); //2021-07-14  00:00:00

let db = new PollutionHistory();
db.pollutionList = testData;

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

const validationData = [
    1626213600,
    data,
    [2, 2, 1, 4, 5, 5, 5]
];


const validationDataMonday = [
    1626213600,
    data,
    1626127200
];

function testFindneareastMonday() {

}