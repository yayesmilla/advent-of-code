import { readInput } from '../../utils/utils';
import * as log from '../../utils/logger';

function parseSeeds(text) {
    // strip unneccessary stuff
    const seedTxt = text.replace(/seeds:\s/, '');
    const seeds = seedTxt.match(/\d+/g);

    return seeds.map(seed => (parseInt(seed)));
}

function solve() {
    const inputs = readInput(__dirname + '/input.txt', '\n');

    const seedText = inputs.shift();
    const seeds = parseSeeds(seedText);

    inputs.shift(); // remove next newline

    let mappedItems = remapItems(inputs);
    let lowestLoc = 0;

    seeds.forEach(seed => {
        let refValue = seed;
        let mapCtr = 0;

        while(mapCtr < mappedItems.length) {
            refValue = getDestValue(mappedItems[mapCtr], refValue);
            mapCtr++;
        }

        lowestLoc = lowestLoc === 0 ? refValue :
            (refValue < lowestLoc ? refValue : lowestLoc);
    });

    log.white(`Lowest location: ${lowestLoc}`);
}

function getDestValue(items, srcValue) {

    let destValue = srcValue;

    items.forEach(item => {
        if (isInRange(item.src, (item.src + (item.range - 1)), srcValue)) {
            const offset = srcValue - item.src;
            destValue = item.dest + offset;

            return destValue;
        }
    });

    return destValue;
}

function isInRange(start, end, value) {
    if (value <= end && value >= start) {
        return true;
    }

    return false;

}

function remapItems(inputs) {
    const mappedItems = [];

    let startIndex = 0;
    inputs.forEach((input, index) => {
        if (input === '') {
            mappedItems.push(normalizeInputs(inputs, startIndex, index));
            startIndex = index + 1;
        } else if (index + 1 === inputs.length) { // this is the last one
            mappedItems.push(normalizeInputs(inputs, startIndex, index + 1));
        }
    });

    return mappedItems;
}

function normalizeInputs(inputs, startIndex, length) {

    const maps = inputs.slice(startIndex, length);
    // extract the 1st one - this is the mapping type
    maps.shift();
    const numberMaps = maps.map(mapString => {
        const [dest, src, range] = mapString.split(' ');

        return {
            dest: parseInt(dest),
            src: parseInt(src),
            range: parseInt(range)
        };
    });

    return numberMaps;
}

export { solve }