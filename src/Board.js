import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

// This function has three props: 1) numRows, default three, 2) numCols, default three...
// and 3) oddsLit, default [0.25]. It is designed to render an HTML table of individual...
// <Cell /> components.
function Board({ numRows = 4, numCols = 4, oddsLit = 0.25 }) {
  // Declare a new state variable 'board' w/ the [useState()] Hook.
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    // Declare an 'initialBoard' variable.
    let initialBoard = [];

    // Thnk about the gameboard as a grid w/ y-values aligned to the 'numRows' prop...
    // and x-values aligned to the 'numCols' prop. Cycle through each row.
    for (let y = 0; y < numRows; y++) {
      // Use the JS Array object's [.from()] method + [length] property...
      // to generate an array w/ a length equal to the 'numCols' prop...
      // for every single row of the gameboard.
      initialBoard.push(Array.from({ length: numCols }));

      /* Now the 'initialBoard' variable is an array of arrays. Like this:

      [
       [undefined, undefined, undefined]
       [undefined, undefined, undefined]
       [undefined, undefined, undefined]
       ] 
      
       */
    }

    // This function will generate a value of 'true' or 'false' w/ its...
    // probabilities aligned to the 'oddsLit' prop.
    const booleanGenerator = () => {
      const randomNum = Math.floor(Math.random() * 10 + 1);
      return randomNum > oddsLit * 10 ? false : true;
    };

    // Cycle through each row of the gameboard.
    for (let y = 0; y < numRows; y++) {
      // Cycle through every element in the row.
      for (let x = 0; x < numCols; x++) {
        // Use the [booleanGenerator()] function to set the value for each element...
        // in the array of arrays we've created.
        initialBoard[y][x] = booleanGenerator();
      }
    }

    return initialBoard;
  }

  // This is a simplified version of the [createBoard()] function above. Note, it...
  // is just as effective.
  const generateBoard = () => {
    let ogBoard = [];
    for (let y = 0; y < numRows; y++) {
      let row = [];
      for (let x = 0; x < numCols; x++) {
        row.push(Math.random() < oddsLit);
      }
      ogBoard.push(row);
    }
    return ogBoard;
  };

  // If all of the lights on the gameboard are out, then the player has won.
  const checkWin = () => {
    let outcome = true;
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        if (board[y][x] === true) {
          outcome = false;
        }
      }
    }
    return outcome;
  };

  // This is a simplified version of the [checkWin()] function above. Note, it is...
  // just as effective.
  function hasWon() {
    return board.every((row) => row.every((cell) => !cell));
  }

  const flipCells = (y, x) => {
    setBoard((gameboard) => {
      // Change the value of the element at the given coordinates.
      gameboard[y][x] = !gameboard[y][x];

      // If the cell below the target exists, then change its value.
      if (y + 1 < 3) {
        gameboard[y + 1][x] = !gameboard[y + 1][x];
      }

      // If the cell above the target exists, then change its value.
      if (y - 1 >= 0) {
        gameboard[y - 1][x] = !gameboard[y - 1][x];
      }

      // If the cell to the right of the target exists, then change its value.
      if (x - 1 >= 0) {
        gameboard[y][x - 1] = !gameboard[y][x - 1];
      }

      // If the cell to the right of the target exists, then change its value.
      if (x + 1 < 3) {
        gameboard[y][x + 1] = !gameboard[y][x + 1];
      }

      let gameboardCopy = gameboard.map((row) => [...row]);

      return gameboardCopy;
    });
  };

  // This is an alternate version of the [flipCells()] function above. Note, it is...
  // just as effective.
  function altFlipCells(coordinates) {
    setBoard((oldBoard) => {
      const [y, x] = coordinates.split('-').map(Number);

      const flipCell = (y, x, boardCopy) => {
        // If this coord is actually on board, then flip it.
        if (x >= 0 && x < numCols && y >= 0 && y < numRows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map((row) => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  }

  // Check to see if the user has won the game. If they have, congratulate them.
  if (checkWin()) {
    return <div>Congratulations!</div>;
  }

  let gameboard = [];

  for (let y = 0; y < numRows; y++) {
    let row = [];
    for (let x = 0; x < numCols; x++) {
      let coordinates = `${y}-${x}`;
      row.push(
        <Cell
          key={coordinates}
          isLit={board[y][x]}
          flipAdjacentCells={() => altFlipCells(coordinates)}
        />
      );
    }
    gameboard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className='Board'>
      <tbody>{gameboard}</tbody>
    </table>
  );
}

export default Board;
