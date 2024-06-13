export type GameTile = 'x' | 'o' | ''

interface GameState {
  isEnded: boolean
  winner: GameTile
}

export interface Game {
  board: Board
  turnPlayer: GameTile
  gameState: GameState
}

interface Board {
  cells: GameTile[]
}

const createBoard = (): Board => ({ cells: Array(9).fill('') });
const createGameState = (): GameState => ({ isEnded: false, winner: '' });
export const createGame = (): Game => ({ board: createBoard(), gameState: createGameState(), turnPlayer: 'x' });

const evaluateIsEnded = (board: Board): boolean => board.cells.every(cell => cell !== '');

const evaluateWinner = (board: Board): GameTile => {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const line of lines) {
    const tilesInLine = line.map(position => board.cells[position]);
    if (tilesInLine.every(tile => tile === tilesInLine[0])) return tilesInLine[0];
  }

  return '';
}

const evaluateGameState = (board: Board): GameState => {

  const winner = evaluateWinner(board);
  const isEnded = winner !== '' ? true : evaluateIsEnded(board);

  const result = {
    isEnded,
    winner
  }

  return result;
}

export const applyMove = (game: Game, position: number, tile: GameTile): Game => {
  if (
    game.board.cells[position] !== ''
    || game.turnPlayer !== tile
    || game.gameState.isEnded
  ) return game;

  const board0: Board = { cells: [...game.board.cells.map((cell, i) => i === position ? tile : cell)]}
  const turnPlayer0: GameTile = game.turnPlayer === 'x' ? 'o' : 'x';
  const gameState0: GameState = evaluateGameState(board0);

  const game0: Game = {
    board: board0,
    turnPlayer: turnPlayer0,
    gameState: gameState0
  };

  return game0;
}