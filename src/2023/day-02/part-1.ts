import { convertToArray } from '../../utils/utils';
import * as log from '../../utils/logger';
import { input } from './input';

function solve() {
    const games = convertToArray(input, '||');

    const cubes = {
        'red': 12, 'green': 13, 'blue': 14
    };

    let gameSum = 0;
    let gameIteration = 0;

    games.forEach((game, gameIndex) => {
        gameIteration = gameIndex + 1;
        const sets = convertToArray(game, '; ');

        const filteredSets = sets.filter(set => {
            const rounds = convertToArray(set, ', ');
            const filteredRounds = rounds.filter(round => {
                const [resVal, resColor] = round.split(' ');
                return cubes[resColor] >= resVal;
            });
        
            return rounds.length === filteredRounds.length;
        });
      if ( sets.length === filteredSets.length ) {
            gameSum += gameIteration;
            log.green(`${gameIteration}: ${game} -> POSSIBLE`);
        } else {
            log.red(`${gameIteration}: ${game} -> NOT-POSSIBLE`);
        }
    });
    
    log.def('-----------------');
    log.def(`Game Sum: ${gameSum}`);
}

export { solve };