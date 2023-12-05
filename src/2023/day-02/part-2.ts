import { convertToArray, getProduct, getSum, readInput } from '../../utils/utils';
import * as log from '../../utils/logger';

function solve() {
    const games = readInput(__dirname + '/input.txt');

    let sets, rounds;
    let resVal, resColor;
    let parseVal;
    let power = 1;

    const powers = games.map((game) => {
        let cubesMax = { blue: 0, red: 0, green: 0 };

        // strip unnecessary stuff
        game = game.replace(/Game\s[0-9]{1,3}:\s/, '');

        sets = convertToArray(game, '; ');
        sets.forEach(set => {
            rounds = convertToArray(set, ', ');
            rounds.forEach(round => {

                [resVal, resColor] = convertToArray(round, ' ');
                parseVal = parseInt(resVal);

                if (cubesMax[resColor] === 0) {
                    cubesMax[resColor] = parseVal;
                } else {
                    cubesMax[resColor] = cubesMax[resColor] < parseVal ? parseVal : cubesMax[resColor];
                }
            }); // end round
        }); // end set

        power = getProduct(Object.values(cubesMax));

        return power;

    }); // end game

    log.white(`Game Sum: ` + getSum(powers));
}

export { solve };
