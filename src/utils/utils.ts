import { readFileSync } from 'fs';
import * as log from './logger';

function convertToArray(input: string, separator: string): any[] {
  return input.split(separator);
};

function getSum(items: number[]): number {
    return items.reduce((accummulator, currentValue) => accummulator + currentValue, 0);
}

function getProduct(items: number[]): number {
  return items.reduce((accummulator, currentValue) => accummulator * currentValue, 1);
}

function getMatchingIndices(haystack, needle) {
  const regex = new RegExp("(?<!\\d)" + needle + "(?!\\d)", "g");

  const result = [];
  let match;
  while (match = regex.exec(haystack)) {
      result.push(match.index);
  }

  return result;
}

function readInput(filename, separator: string = '\n'): string[] {

    try {
        const file = readFileSync(filename, 'utf8');
        // convert to array
        const arrayItems = convertToArray(file, separator);
        // pop the last one since it's always empty
        //arrayItems.pop();

        return arrayItems;
    } catch (err) {
        log.red(`Cannot read file ${filename}`);
        return [];
    }
}
export { convertToArray, getSum, getProduct, getMatchingIndices, readInput };
