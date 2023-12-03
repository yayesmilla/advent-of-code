function green(text) {
    console.log(`\x1b[32m ${text} \x1b[0m`);
};

function red(text) {
    console.log(`\x1b[31m ${text} \x1b[0m`);
};

function def(text) { // white
    console.log(`\x1b[37m ${text} \x1b[0m`);
}
  
export { green, red, def };
  