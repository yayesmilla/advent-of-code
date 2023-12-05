import { convertToArray, getMatchingIndices, getProduct, readInput } from '../../utils/utils';
import * as log from '../../utils/logger';

let stars = [];

function solve() {
    const inputs = readInput(__dirname + '/input.txt');
    inputs.forEach((input, inputIndex) => {

        console.log(`input: ${input}`);
        const numbers = input.match(/\d+/g);
        const uniqNumbers = Array.from(new Set(numbers));

        uniqNumbers.forEach(number => {
            const indices = getMatchingIndices(input, number);
            const numLength = number.length;
            indices.forEach(index => {
                findStar(inputs, inputIndex, index - 1, index + numLength, parseInt(number));
            });
        });
    });

    let totalSum = 0;

    Object.values(stars).forEach(starItems => {
        const product = starItems.length === 2 ? getProduct(starItems) : 0;
        console.log(`starItems: `, starItems, ` product: ${product}`);
        totalSum += product;
    });

    log.white(`Total Sum: ${totalSum}`);
}

function findStar(items, currentInputIndex, numFirstIdx, numLastIdx, number) {

    const lastItemsIdx = items.length - 1;

    if (items[currentInputIndex][numFirstIdx] === '*') { // left
        setStarXy(currentInputIndex, numFirstIdx, number);
    }

    if (items[currentInputIndex][numLastIdx] === '*') { // right
        setStarXy(currentInputIndex, numLastIdx, number);
    }

    let starPosX = [], starPosY = [];

    // check top and bottom
    if (currentInputIndex === 0) { // only check the next
        starPosX = [currentInputIndex + 1];
    } else if (currentInputIndex === lastItemsIdx) {
        starPosX = [currentInputIndex - 1];
    } else { // check both
        starPosX = [currentInputIndex - 1, currentInputIndex + 1];
    }

    starPosX.forEach(posX => {
        starPosY = findStarPositionY(items[posX], numFirstIdx, numLastIdx);
        starPosY.forEach(posY => {
            setStarXy(posX, posY, number);
        });
    });
}

function setStarXy(x: number, y: number, value) {
    if (stars.hasOwnProperty(`${x}-${y}`)) {
        stars[`${x}-${y}`].push(value);
    } else {
        stars[`${x}-${y}`] = [value];
    }
}

function findStarPositionY(haystack, numFirstIdx, numLastIdx) {
    let starPosY = [];

    for(let i = numFirstIdx; i <= numLastIdx; i++) {
        if (haystack[i] === '*') {
            starPosY.push(i);
        }
    }

    return starPosY;
}

export { solve };
