import * as Util from '../utility/utilFunctions';

const testData = [
    { "aqi": 2, "time": 1625781600 }, //2021-07-09  00:00:00 Thu
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
    1626127200
];

export function testFindNearestMonday() {
    console.log(Util.findNearestMonday(validationData[0]));
    console.log("GOAL");
    console.log(validationData[1]);
    return Util.findNearestMonday(validationData[0]) == validationData[1];
}