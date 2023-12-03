import { convertToArray } from '../../utils/utils';
import { input } from './input';

function solve() {
    const inputs = convertToArray(input, ',');
    let parsedNum = 0, sum = 0;

    inputs.forEach((input) => {
        parsedNum = convertTextToDigit(input);
        console.log(`Input: ${input} --> Calibration: ${parsedNum}`);
        sum += parsedNum;
    });

    console.log('------------');
    console.log(`sum: ${sum}`);
}

function compareNums(a, b) {
    return a.order - b.order;
}

function getAllOccuringIndices(haystack, needle) {
    let indices = [],
        i = -1;
    while ((i = haystack.indexOf(needle, i + 1)) != -1) {
        indices.push(i);
    }

    return indices;
}

function parseIndices(arrayItems, haystack) {
    let indices = [];
    arrayItems.forEach((text, index) => {
        const indexItemsWord = getAllOccuringIndices(haystack, text);
        const indexItemsDigit = getAllOccuringIndices(haystack, index);
        const combined = indexItemsWord.concat(indexItemsDigit);
        let mapped = [];
        if (combined.length > 0) {
            mapped = combined.map((i) => ({ order: i, digit: index }));
            indices = indices.concat(mapped);
        }
    });

    return indices.sort(compareNums);
}

function convertTextToDigit(text) {
    let final = 0;
    const numberWords = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
    ];
    const indices = parseIndices(numberWords, text);

    if (indices.length > 1) {
        final = parseInt(indices[0].digit + '' + indices[indices.length - 1].digit);
    } else if (indices.length === 1) {
        final = parseInt(indices[0].digit + '' + indices[0].digit);
    }

    return final;
};

export { solve };