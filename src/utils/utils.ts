function convertToArray(input: string, separator: string) {
  return input.split(separator);
};

function getTotalSum(items: number[]): number {
    return items.reduce((accummulator, currentValue) => accummulator + currentValue, 1);
}

function getTotalProduct(items: number[]): number {
  return items.reduce((accummulator, currentValue) => accummulator * currentValue, 1);
}

export { convertToArray, getTotalSum, getTotalProduct };
