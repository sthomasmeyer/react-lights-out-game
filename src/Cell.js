import React from 'react';
import './Cell.css';

// This function represents a single cell on the gameboard. It has two properties...
// (1) the function [flipAdjacentCells()] and (2) a boolean 'isLit'
function Cell({ flipAdjacentCells, isLit = false }) {
  const classes = `Cell ${isLit ? 'Cell-lit' : ''}`;
  // Note that [flipAdjacentCells()] is executed on-click.
  return <td className={classes} onClick={flipAdjacentCells} role='button' />;
}

export default Cell;
