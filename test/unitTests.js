import { testFindNearestIndex } from './testFindNearestIndex';
import { testFindNearestMonday } from './testFindNearestMonday';

export function runAllTests() {
    const tests = [
        { name: "findNearestIndex", test: testFindNearestIndex },
        { name: "findNearestMonday", test: testFindNearestMonday }
    ];
    let countPassed = 0;
    let countFailed = 0;

    console.log("Running Tests...");
    console.log("-------------");

    for (let test in tests) {
        let testResult = tests[test].test();
        testResult ? countPassed += 1 : countFailed += 1;
        console.log(tests[test].name + ": " + testResult);
    }

    console.log("-------------");
    console.log("Finished running tests: " + countPassed + " passed and " + countFailed + " failed");
}
