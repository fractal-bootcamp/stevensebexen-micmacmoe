import { useState } from "react"
import { Game, GameTile, applyMove, createGame } from "./game/game"

export default function GameBoard() {
  const [game, setGame] = useState<Game>(createGame());

  const onCellClick = (position: number): void => {
    const game0 = applyMove(game, position, game.turnPlayer);
    setGame(game0);
  }

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex flex-1 flex-row flex-wrap place-items-center'>
        {
          Array(9).fill(0).map((_, i) =>
            <GameCell key={i} tile={game.board.cells[i]} onClick={() => onCellClick(i)}/>
          )
        }
      </div>
      <button className='flex-1 place-self-center' onClick={() => setGame(createGame())}>reset.</button>
      {game.gameState.isEnded
        && <div className='flex-1 place-self-center'>
          {
            game.gameState.winner === '' ? 'tie.' : `winner: ${game.gameState.winner}`
          }
        </div>
      }
    </div>
  )
}

interface GameCellProps {
  onClick: () => void
  tile: GameTile
}
function GameCell(props: GameCellProps) {
  return (
    <div 
      className='flex h-32 py-5 place-content-center place-items-center border flex-1 basis-1/3 select-none'
      onClick={props.onClick}
    >
      {props.tile}
    </div>
  )
}