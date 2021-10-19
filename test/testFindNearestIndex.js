import * as Util from '../utility/utilFunctions';

export function testFindNearestIndex() {
    //Structure of testdata: [unixtime, array, rightAnswer]
    const testData = [
        [
            1634098000,
            [
                { "aqi": 2, "time": 1634096000 },
                { "aqi": 1, "time": 1634106000 }, //Correct index
                { "aqi": 4, "time": 1634116000 },
                { "aqi": 5, "time": 1634126000 }
            ],
            1
        ],

        [
            1633098000,
            [
                { "aqi": 2, "time": 1634096000 }, //Correct index
                { "aqi": 1, "time": 1634106000 },
                { "aqi": 4, "time": 1634116000 },
                { "aqi": 5, "time": 1634126000 }
            ],
            0
        ],

        [
            1635098000,
            [
                { "aqi": 2, "time": 1634096000 },
                { "aqi": 1, "time": 1634106000 },
                { "aqi": 4, "time": 1634116000 },
                { "aqi": 5, "time": 1634126000 }
            ],
            null
        ],

        [
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
        ],

        [
            1634116000,
            [
                { "aqi": 2, "time": 1634096000 },
                { "aqi": 1, "time": 1634106000 }, //Correct index
                { "aqi": 4, "time": 1634116000 },
                { "aqi": 5, "time": 1634126000 }
            ],
            2
        ],

        [
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
        ]
    ]

    for (let test in testData) {
        let testDidPass = Util.findNearestIndex(testData[test][0], testData[test][1]) == testData[test][2];
        if (!testDidPass) { return false }
    }
    return true;
}