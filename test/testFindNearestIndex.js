import * as Util from '../utility/utilFunctions';

export function testFindNearestIndex() {
    //Structure of testdata: [unixtime, array, rightAnswer]
    const testData = [
        1634098000,
        [
            { "aqi": 2, "time": 1634096000 },
            { "aqi": 1, "time": 1634106000 }, //Correct index
            { "aqi": 4, "time": 1634116000 },
            { "aqi": 5, "time": 1634126000 }
        ],
        1
    ];

    const testData2 = [
        1633098000,
        [
            { "aqi": 2, "time": 1634096000 }, //Correct index
            { "aqi": 1, "time": 1634106000 },
            { "aqi": 4, "time": 1634116000 },
            { "aqi": 5, "time": 1634126000 }
        ],
        0
    ];

    const testData3 = [
        1635098000,
        [
            { "aqi": 2, "time": 1634096000 },
            { "aqi": 1, "time": 1634106000 },
            { "aqi": 4, "time": 1634116000 },
            { "aqi": 5, "time": 1634126000 }
        ],
        null
    ];

    const testData4 = [
        1634318000,
        [
            { "aqi": 2, "time": 1634166000 },
            { "aqi": 1, "time": 1634176000 },
            { "aqi": 3, "time": 1634186000 },
            { "aqi": 1, "time": 1634196000 },
            { "aqi": 2, "time": 1634206000 },
            { "aqi": 1, "time": 1634216000 },
            { "aqi": 5, "time": 1634226000 },
            { "aqi": 1, "time": 1634236000 },
            { "aqi": 1, "time": 1634246000 },
            { "aqi": 3, "time": 1634256000 },
            { "aqi": 3, "time": 1634266000 },
            { "aqi": 3, "time": 1634276000 },
            { "aqi": 1, "time": 1634286000 },
            { "aqi": 2, "time": 1634296000 },
            { "aqi": 3, "time": 1634306000 },
            { "aqi": 1, "time": 1634316000 },
            { "aqi": 4, "time": 1634326000 }, //Correct index
            { "aqi": 1, "time": 1634336000 },
            { "aqi": 2, "time": 1634346000 },
            { "aqi": 2, "time": 1634356000 },
            { "aqi": 1, "time": 1634366000 },
            { "aqi": 1, "time": 1634376000 },
            { "aqi": 4, "time": 1634386000 },
            { "aqi": 5, "time": 1634396000 },
        ],
        16
    ];

    const testData5 = [
        1634116000,
        [
            { "aqi": 2, "time": 1634096000 },
            { "aqi": 1, "time": 1634106000 }, //Correct index
            { "aqi": 4, "time": 1634116000 },
            { "aqi": 5, "time": 1634126000 }
        ],
        2
    ];

    const testData6 = [
        1634226000,
        [
            { "aqi": 2, "time": 1634166000 },
            { "aqi": 1, "time": 1634176000 },
            { "aqi": 3, "time": 1634186000 },
            { "aqi": 1, "time": 1634196000 },
            { "aqi": 2, "time": 1634206000 },
            { "aqi": 1, "time": 1634216000 },
            { "aqi": 5, "time": 1634226000 }, //Correct index
            { "aqi": 1, "time": 1634236000 },
            { "aqi": 1, "time": 1634246000 },
            { "aqi": 3, "time": 1634256000 },
            { "aqi": 3, "time": 1634266000 },
            { "aqi": 3, "time": 1634276000 },
            { "aqi": 1, "time": 1634286000 },
            { "aqi": 2, "time": 1634296000 },
            { "aqi": 3, "time": 1634306000 },
            { "aqi": 1, "time": 1634316000 },
            { "aqi": 4, "time": 1634326000 },
            { "aqi": 1, "time": 1634336000 },
            { "aqi": 2, "time": 1634346000 },
            { "aqi": 2, "time": 1634356000 },
            { "aqi": 1, "time": 1634366000 },
            { "aqi": 1, "time": 1634376000 },
            { "aqi": 4, "time": 1634386000 },
            { "aqi": 5, "time": 1634396000 },
        ],
        6
    ];

    let result = Util.findNearestIndex(testData[0], testData[1]) == testData[2];
    let result2 = Util.findNearestIndex(testData2[0], testData2[1]) == testData2[2];
    let result3 = Util.findNearestIndex(testData3[0], testData3[1]) == testData3[2];
    let result4 = Util.findNearestIndex(testData4[0], testData4[1]) == testData4[2];
    let result5 = Util.findNearestIndex(testData5[0], testData5[1]) == testData5[2];
    let result6 = Util.findNearestIndex(testData6[0], testData6[1]) == testData6[2];



    return result && result2 && result3 && result4 && result5 && result6;
}