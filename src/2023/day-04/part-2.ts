import { convertToArray, getSum, readInput } from '../../utils/utils';
import * as log from '../../utils/logger';

let cardsWon = [];

function solve() {
    let inputs = readInput(__dirname + '/input.txt');
    const digitPattern = /\d+/g;

    inputs.forEach((card, cardIndex) => {
        // strip unneccessary stuff
        card = card.replace(/Card\s{1,3}[0-9]{1,3}:/, '');
        const [winningCard, myCard] = convertToArray(card, ' | ');
        const winningNumbers = winningCard.match(digitPattern);
        const myNumbers = myCard.match(digitPattern);
        const numbersWon = getWinningNumbers(myNumbers, winningNumbers);
        getWinInstances(cardIndex, numbersWon);
    });

    let totalSum = getSum(Object.values(cardsWon));
    log.white(`Total Sum: ${totalSum}`);
}

function getWinInstances(cardIndex, iteration) {

    const cardKey1 = `card-${cardIndex}`;

    if (iteration === 0) {
        cardsWon[cardKey1] = cardsWon.hasOwnProperty(cardKey1)
            ? cardsWon[cardKey1]
            : 0;
    }

    const winsCount = iteration + cardIndex;

    // tally original wins
    tallyCardsWon(cardIndex, winsCount);
    // tally copy wins
    const copies = cardsWon[cardKey1] - 1;
    let copyCtr = 0;
    while (copies > copyCtr) { // keep on tallying the cards as long as there are copies
        tallyCardsWon(cardIndex + 1, winsCount);
        copyCtr++;
    }
}

function tallyCardsWon(startIndex, iteration) {
    let cardKey, i;
    for (i = startIndex; i <= iteration; i++) {
        cardKey = `card-${i}`;
        cardsWon[cardKey] = cardsWon.hasOwnProperty(cardKey) ? cardsWon[cardKey] + 1 : 1;
    }
}

function getWinningNumbers(array1, array2) {
    const items = array2.filter(value => (array1.includes(value)));

    return items.length;
}

export { solve }
