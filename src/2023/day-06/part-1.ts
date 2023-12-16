import { readInput, getProduct } from '../../utils/utils';
import * as log from '../../utils/logger';

function solve() {
    const inputs = readInput(__dirname + '/input-sample.txt', '\n');

    const times = cleanupInput(inputs.shift());
    const distances = cleanupInput(inputs.shift());
    let marginOfError = [];

    times.forEach((time, index) => {
        marginOfError.push(getNumWaysToWin(time, distances[index]));
    });

    const marginOfErrProduct = getProduct(marginOfError);

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

    return numbers.map(num => (parseInt(num)));
}

export { solve };