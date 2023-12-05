function green(text) {
    console.log(`\x1b[42m\x1b[30m${text} \x1b[0m`);
};

function red(text) {
    console.log(`\x1b[41m\x1b[30m${text} \x1b[0m`);
};

function white(text) { // white
    console.log(`\x1b[47m\x1b[30m${text} \x1b[0m`);
}

function blue(text) { // white
    console.log(`\x1b[46m\x1b[30m${text} \x1b[0m`);
}

export { green, red, white };
