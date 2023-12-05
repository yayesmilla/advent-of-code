import { convertToArray, readInput } from '../../utils/utils';
import * as log from '../../utils/logger';

function solve() {
    const games = readInput(__dirname + '/input.txt');

    const cubes = {
        'red': 12, 'green': 13, 'blue': 14
    };

    let gameSum = 0;
    let gameIteration = 0;

    games.forEach((game, gameIndex) => {
        gameIteration = gameIndex + 1;

        // strip unnecessary stuff
        game = game.replace(/Game\s[0-9]{1,3}:\s/, '');
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
            log.green(`Game ${gameIteration}: ${game} -> POSSIBLE`);
        } else {
            log.red(`Game ${gameIteration}: ${game} -> NOT-POSSIBLE`);
        }
    });

    log.white(`Game Sum: ${gameSum}`);
}

export { solve };
