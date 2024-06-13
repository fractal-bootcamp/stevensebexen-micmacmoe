import { Game, applyMove, evaluatePossiblePositions } from "./game";

interface TreeNode {
  game: Game
  branches: TreeNode[]
}

const createNode = (game: Game, branches: TreeNode[]): TreeNode => ({ game, branches });

export const createTree = (game: Game, depth: number): TreeNode => {
  if (depth <= 0 || game.gameState.isEnded) {
    const terminalNode = createNode(game, []);
    return terminalNode;
  }
  const possiblePositions = evaluatePossiblePositions(game.board);
  const possibleGames = possiblePositions.map(position => applyMove(game, position, game.turnPlayer));
  const branches = possibleGames.map(game => createTree(game, depth - 1));
  const rootNode = createNode(game, branches);
  return rootNode;
}

// Positive values indicate a win for 'x', negative a win for 'o'
export const analyzePosition = (node: TreeNode, depth: number, isMaximizing: boolean): number => {

  if (node.game.gameState.isEnded) {
    switch (node.game.gameState.winner) {
      case 'x':
        return Infinity;
      case 'o':
        return -Infinity;
      default:
        return 0;
    }
  }

  if (depth <= 0) return 0;

  const branchValues = node.branches.map(branch => analyzePosition(branch, depth - 1, !isMaximizing));
  const nodeValue = isMaximizing ? Math.max(...branchValues) : Math.min(...branchValues);

  return nodeValue;
}