import { convertToArray, getTotalProduct, getTotalSum } from '../../utils/utils';
import * as log from '../../utils/logger';
import { input } from './input';

function solve() {
    const games = convertToArray(input, '||');

    let sets, rounds;
    let resVal, resColor;
    let parseVal;
    let power = 1;

    const powers = games.map((game) => {
        let cubesMax = { blue: 0, red: 0, green: 0 };

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

        power = getTotalProduct(Object.values(cubesMax));

        return power;

    }); // end game
    
    log.def('-----------------');
    log.def(`Game Sum: ` + getTotalSum(powers));
}

export { solve };