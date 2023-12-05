import { convertToArray, readInput } from '../../utils/utils';
import * as log from '../../utils/logger';

function solve() {
    let inputs = readInput(__dirname + '/input.txt');
    const digitPattern = /\d+/g;
    let pileTotal = 0;

    inputs.forEach((card, cardIndex) => {

        // strip unneccessary stuff
        card = card.replace(/Card\s{1,3}[0-9]{1,3}:/, '');
        const [winningCard, myCard] = convertToArray(card, ' | ');
        const winningNumbers = winningCard.match(digitPattern);
        const myNumbers = myCard.match(digitPattern);

        const myWinningNumbers = getMyWinningNumbers(myNumbers, winningNumbers);
        const cardPoints = calculateWinningCardPoints(myWinningNumbers.length);
        console.log(`winningNumbers: `, myWinningNumbers, ` points: ${cardPoints}`);

        pileTotal += cardPoints;
    });

    log.white(`Pile total: ${pileTotal}`);
}

function getMyWinningNumbers(array1, array2) {

    return array2.filter(value => (array1.includes(value)));
}

function calculateWinningCardPoints(numbersWon: number) {

    if (numbersWon === 0) {
        return 0;
    } else if (numbersWon === 1) {
        return 1;
    } else {
        return Math.pow(2, numbersWon - 1);
    }
}

export { solve }
