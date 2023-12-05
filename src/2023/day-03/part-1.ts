import { getMatchingIndices, readInput } from '../../utils/utils';
import * as log from '../../utils/logger';

function solve() {

    let inputs = readInput(__dirname + '/input.txt');
    let sum = 0;

    inputs.forEach((input, inputIndex) => {
        let numbers = input.match(/\d+/g);
        const uniqNumbers = Array.from(new Set(numbers));

        uniqNumbers.forEach(number => {
            // get all index occurrences
            const indices = getMatchingIndices(input, number);
            const numLength = number.length;

            indices.forEach(index => {
                if (isAdjacentToSymbol(inputs, inputIndex, index - 1, index + numLength)) {
                    sum += parseInt(number);
                }
            });
         }); // end numbers

    }); // end inputs

    log.white(`Total Sum: ${sum}`); // Total Sum: 537832
}

function isAdjacentToSymbol(items, currentInputIndex, numFirstIdx, numLastIdx) {

    const lastItemsIdx = items.length - 1;
    if (isSym(items[currentInputIndex][numFirstIdx]) || isSym(items[currentInputIndex][numLastIdx])) { //if beside a symbol
        return true;
    }

    if (currentInputIndex === 0) { // only check the next
        return isSymbol(items[currentInputIndex + 1], numFirstIdx, numLastIdx);
    } else if (currentInputIndex === lastItemsIdx) {

        return isSymbol(items[currentInputIndex - 1], numFirstIdx, numLastIdx);
    } else { // check both
        const isTopAdjacent = isSymbol(items[currentInputIndex - 1], numFirstIdx, numLastIdx);
        const isBottomAdjacent = isSymbol(items[currentInputIndex + 1], numFirstIdx, numLastIdx);

        return isTopAdjacent || isBottomAdjacent;
    }
}

function isSymbol(items, numFirstIdx, numLastIdx, debug = false) {
    //let isSymb = false;
    for(let i = numFirstIdx; i <= numLastIdx; i++) {

        const isSymb = isSym(items[i]);

        if (isSymb) {
            return true;
        }
    }

    return false;
}


function isSym(value) {
    const isNumber = /^\d+$/.test(value);
    return typeof value !== 'undefined' && value !== '.' && !isNumber;
}

export { solve };
