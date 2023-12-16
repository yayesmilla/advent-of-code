import { readInput, getProduct } from '../../utils/utils';
import * as benchmark from '../../utils/benchmark';
import * as log from '../../utils/logger';

function solve() {
    const inputs = readInput(__dirname + '/input.txt', '\n');

    benchmark.start();

    const time = cleanupInput(inputs.shift());
    const distance = cleanupInput(inputs.shift());
    let marginOfErrProduct = getNumWaysToWin(time, distance);

    benchmark.end();
    log.white(`Margin of Error: ${marginOfErrProduct}`);
}

function getNumWaysToWin(base, recordDistance) {

    let ctr = 0;
    let triggerCount = null
    let waysToWinCtr = 0;
    while (ctr <= base) {
        const dist = (base - ctr) * ctr;

        if (dist > recordDistance && triggerCount === null) {
            waysToWinCtr++;
            triggerCount = dist;
        } else if (dist > recordDistance) {
            waysToWinCtr++;
        } else if (dist === triggerCount) {
            waysToWinCtr++;
            break;
        }

        ctr++;
    }

    return waysToWinCtr;
}

function cleanupInput(textInput) {
    const numbers = textInput.match(/\d+/g);

    let finalNum = '';
    numbers.forEach(num => {
        finalNum += num.toString();
    });

    return parseInt(finalNum);

}

export { solve };