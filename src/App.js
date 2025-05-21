import { useState } from 'react';

function Square( {value, onSquareClick} ) {
  return (
    <button
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(boardIndex) {
    const nextSquares = squares.slice();

    if (nextSquares[boardIndex] == null) {
      if (turn == 'X') {
        nextSquares[boardIndex] = "X";
        setTurn('O');
      } else {
        nextSquares[boardIndex] = "O";
        setTurn('X');
      }

      setSquares(nextSquares);
    } else {
      calculateWinner(squares);
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "It's " + turn + "'s turn";
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  return (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <ol>{/*TODO*/}</ol>
    </div>
  </div>
  );
}

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [first, second, third] = winningLines[i];

    if (squares[first] && squares[first] === squares[second] && squares[first] === squares[third]) {
      return squares[first];
    }
  }
  return null;
}