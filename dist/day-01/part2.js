import { convertToArray } from '../utils';
import { input } from '../inputs/day-01';
export const solve = () => {
    const inputs = convertToArray(input, ',');
    let parsedNum = 0, sum = 0;
    inputs.forEach((input) => {
        parsedNum = convertTextToDigit(input);
        document.writeln(`<b>Input:</b> ${input} -->  <b>Calibration</b>: ${parsedNum}<br/>`);
        sum += parsedNum;
    });
    document.writeln(`------<br/>sum: ${sum}`);
};
const compareNums = (a, b) => {
    return a.order - b.order;
};
const getAllOccuringIndices = (haystack, needle) => {
    let indices = [], i = -1;
    while ((i = haystack.indexOf(needle, i + 1)) != -1) {
        indices.push(i);
    }
    return indices;
};
const parseIndices = (arrayItems, haystack) => {
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
};
const convertTextToDigit = (text) => {
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
    }
    else if (indices.length === 1) {
        final = parseInt(indices[0].digit + '' + indices[0].digit);
    }
    return final;
};
