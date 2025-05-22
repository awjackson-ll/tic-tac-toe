import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ turn, squares, onPlay }) {
  function handleClick(boardIndex) {
    if (calculateWinner(squares) || squares[boardIndex]) {
      return;
    }

    const nextSquares = squares.slice();
    if (turn == 'X')
    {
      nextSquares[boardIndex] = 'X';
    } else {
      nextSquares[boardIndex] = 'O';
    }
    onPlay(nextSquares);
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
  const players = ['X', 'O'];
  const [turn, setTurn] = useState(players[Math.floor(Math.random() * players.length)]);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setMove] = useState(0);
  const currentSquares = history[currentMove];
  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setMove(nextHistory.length - 1);
    if (turn == 'X') {
      setTurn('O');
    } else {
      setTurn('X');
    }
  }

  function jumpTo(nextMove) {
    setMove(nextMove);
    if (turn == 'X') {
      setTurn('O');
    } else {
      setTurn('X');
    }
  }

  return (
  <div className="game">
    <div className="game-board">
      <Board turn={turn} squares={currentSquares} onPlay={handlePlay}/>
    </div>
    <div className="game-info">
      <ol>{moves}</ol>
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