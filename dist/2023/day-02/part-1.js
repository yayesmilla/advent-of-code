"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve = void 0;
const utils_1 = require("../../utils/utils");
const log = __importStar(require("../../utils/logger"));
const input_1 = require("./input");
function solve() {
    const games = (0, utils_1.convertToArray)(input_1.input, '||');
    const cubes = {
        'red': 12, 'green': 13, 'blue': 14
    };
    let gameSum = 0;
    let gameIteration = 0;
    games.forEach((game, gameIndex) => {
        gameIteration = gameIndex + 1;
        const sets = (0, utils_1.convertToArray)(game, '; ');
        const filteredSets = sets.filter(set => {
            const rounds = (0, utils_1.convertToArray)(set, '; ');
            const filteredRounds = rounds.filter(round => {
                const [resVal, resColor] = round.split(' ');
                return cubes[resColor] >= resVal;
            });
            return rounds.length === filteredRounds.length;
        });
        if (sets.length === filteredSets.length) {
            gameSum += gameIteration;
            console.log(`%c game ${gameIteration}: ${game} -> POSSIBLE`, 'color: #bada55');
        }
        else {
            log.green(`${gameIteration}: ${game} -> NOT-POSSIBLE`);
            console.log('\x1b[33m Welcome to the app! \x1b[0m');
        }
    });
    console.log('-----------------');
    console.log(`Sum: ${gameSum}`);
}
exports.solve = solve;
