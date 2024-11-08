import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ScoreBoard } from "./ScoreBoard";
import { LastRound } from "./RoundWinner";



function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  let [xScore, setXScore] = useState(0);
  let [oScore, setOScore] = useState(0);
  let [roundReport, setRoundReport] = useState("")

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null)); // Clear the board
    setXScore(xScore);
    setOScore(oScore);
    setXIsNext(true); // Set X as the next player
  }

  let status;

  function startNewGame(roundReport) {
    setSquares(Array(9).fill(null)); // Clear the board

    if (xScore > oScore) {
      alert("X won the game!")
      // setRoundReport("X won the game!!!");
    } else if (oScore > xScore) {
      // setRoundReport("O won the game!!!");
      alert("O won the game!")
    } else {
      alert("Wow, It's a tie!!!")
      // setRoundReport("It's a tie!!!");
    }
    
    setXScore(0);
    setOScore(0);
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);

  // eslint-disable-next-line default-case
  switch (winner) {
    case "Draw":
      status = "Draw!";
      break;
    case "X":
      status = "Winner X";
      xScore++;
      break;
    case "O":
      status = "Winner O";
      oScore++;
      break;
    case null:
      status = "Next player: " + (xIsNext ? "X" : "O");
  }

  /*
  if (winner == "Draw") {
    status = "Draw!"
  } else if(winner === "X") {
    status = "Winner: " + winner;
    setXScore += 1;
  } else if(winner === "O") {
    status = "Winner: " + winner;
    setOScore += 1;
  }
   else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
    */

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
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
    <div className="resetBtn">
      <button onClick={resetGame}>
        Play Again
      </button>
    </div>
    <div className="startGameBtn">
      <button onClick={startNewGame}>
        Reset Score!
      </button>
    </div>
    <ScoreBoard xScore={xScore} oScore={oScore} />
    <LastRound roundReport={roundReport} /> 
    {/* This was removed because the round report was displayed on the screen through the prop but i made it an alert */}
  </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check for a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }

  // Check for a draw
  if (squares.every(square => square !== null)) {
    return "Draw"; // All squares are filled and no winner, so it's a draw
  }

  return null; // Game is still ongoing
}
