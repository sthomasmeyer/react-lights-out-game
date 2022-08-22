import React from 'react';
import './Cell.css';

// This function represents a single cell on the gameboard. It has two properties...
// (1) the function [flipCellsAroundMe()] and (2) a boolean 'isLit'
function Cell({ flipCellsAroundMe, isLit = false }) {
  const classes = `Cell ${isLit ? 'Cell-lit' : ''}`;
  // Note that [flipCellsAroundMe()] is executed on-click.
  return <td className={classes} onClick={flipCellsAroundMe} role='button' />;
}

export default Cell;
