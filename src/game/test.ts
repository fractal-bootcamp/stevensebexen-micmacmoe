import { analyzePosition, createTree } from './analyzer';
import { applyMove, createGame } from './game';

// BASIC LOGIC TEST
// const game = createGame();
// console.log('init', game);

// const game0 = applyMove(game, 0, 'x');
// console.log('0', game0);

// const game1 = applyMove(game0, 0, 'o');
// console.log('1', game1);

// const game2 = applyMove(game1, 2, 'x');
// console.log('2', game2);

// const game3 = applyMove(game2, 2, 'o');
// console.log('3', game3);


// TREE CREATION TEST
// const game = createGame();
// const tree = createTree(game, 10);


// ANALYSIS TEST
const game0 = createGame();
game0.board.cells = ['x', 'x', '', '', '', '', '', '', '']
const tree0 = createTree(game0, 2);
const analysis0 = analyzePosition(tree0, 2, true);
console.log('Expected infinity: ', analysis0);

const game1 = createGame();
game1.board.cells = ['o', 'o', '', 'o', 'o', '', '', '', ''];
const tree1 = createTree(game1, 3);
const analysis1 = analyzePosition(tree1, 3, true);
console.log('Expected neg infinity: ', analysis1);

const game2 = createGame();
const tree2 = createTree(game2, 10);
const analysis2 = analyzePosition(tree2, 10, true);
console.log('Expected 0: ', analysis2);