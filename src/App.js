import { useState } from "react";
import "./App.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function handleClick(i) {
    if (squares[i] || winner) return; // ignore if filled or game over

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);

    const gameWinner = calculateWinner(nextSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setXIsNext(!xIsNext);
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  return (
    <div className="game">
      <h1 className="title">🎮 Tic Tac Toe</h1>
      <div className="board">
        {squares.map((val, i) => (
          <Square key={i} value={val} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="status">
        {winner ? (
          <h2>🏆 {winner} Wins!</h2>
        ) : squares.every(Boolean) ? (
          <h2>🤝 It’s a Draw!</h2>
        ) : (
          <h2>Next Player: {xIsNext ? "❌ X" : "⭕ O"}</h2>
        )}
      </div>
      <button className="reset" onClick={resetGame}>🔄 Play Again</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
