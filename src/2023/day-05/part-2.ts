import { readInput } from '../../utils/utils';
import * as log from '../../utils/logger';
import * as benchmark from '../../utils/benchmark';

function solve() {
    const inputs = readInput(__dirname + '/input.txt', '\n');

    benchmark.start();

    const seedText = inputs.shift();
    // strip unneccessary stuff
    const seedTxt = seedText.replace(/seeds:\s/, '');
    const seeds = seedTxt.match(/\d+/g);

    inputs.shift(); // remove next newline

    let mappedItems = remapItems(inputs);
    let promises = [];

    while(seeds.length > 0) {
        const start = parseInt(seeds.shift());
        const end = start + (parseInt(seeds.shift()) - 1);

        promises.push({start, end});

    }

    console.log(`Total Seed Group: `, promises.length);
    console.log('-----------------------------');

    let ctr = 1

    const mappedPromises = Object.values(promises).map(m => {
        console.log(`SeedGroup ${ctr++}`);
        return getAsyncLowestLoc(m.start, m.end, mappedItems);
    });

    Promise.all(mappedPromises)
        .then(results => {
            let lowestLoc = 0;
            results.forEach(result => {
                lowestLoc = lowestLoc === 0 ? result :
                    (result < lowestLoc ? result : lowestLoc);
            });

            benchmark.end();

            log.white(`Lowest location:: ${lowestLoc}`);
        })
        .catch(err => {
            log.red(`Error in promise, ${err}`);
        });
}

function getAsyncLowestLoc(start, end, mappedItems) {
    const startTime = new Date().getTime();
    let lowestLoc = 0;
    for (let seed = start; seed <= end; seed++) {
        let refValue = seed;
        let mapCtr = 0;
        while(mapCtr < mappedItems.length) {
            refValue = getDestValue(mappedItems[mapCtr], refValue);
            mapCtr++;
        }

        lowestLoc = lowestLoc === 0 ? refValue :
            (refValue < lowestLoc ? refValue : lowestLoc);
    }

    const endTime = new Date().getTime();

    console.log(`start: ${start}, end: ${end}, lowestLoc: ${lowestLoc}, time: ${(endTime - startTime)/1000}s`);
    console.log('-----------------------------');

    return Promise.resolve(lowestLoc);
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
    let mapType = maps.shift();
    mapType = mapType.replace(' map:', '');

    const [srcText, destText] = mapType.split('-to-');
    const numberMaps = maps.map(mapString => {
        const [dest, src, range] = mapString.split(' ');

        return {
            text: destText,
            dest: parseInt(dest),
            src: parseInt(src),
            range: parseInt(range)
        };
    });

    return numberMaps;
}

export { solve }