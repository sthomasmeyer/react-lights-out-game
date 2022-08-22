import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Board from './Board';

describe('<Board /> rendering', function () {
  describe('inital board and win state', function () {
    it('renders without crashing', function () {
      render(<Board />);
    });

    it('matches snapshot for full board', function () {
      const { asFragment } = render(<Board oddsLit={1} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('shows win state when lights are out', function () {
      render(<Board oddsLit={0} />);
      expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    });
  });

  describe('cell click', function () {
    it('toggles lights correctly', function () {
      render(<Board numRows={3} numCols={3} oddsLit={1} />);
      const cells = screen.getAllByRole('button');

      // all cells start out as lit
      cells.forEach((cell) => {
        expect(cell).toHaveClass('Cell-lit');
      });

      // click on the middle cell
      fireEvent.click(cells[4]);

      // now only cells at the corners should be lit
      let litIndices = [0, 2, 6, 8];
      cells.forEach((cell, idx) => {
        if (litIndices.includes(idx)) {
          expect(cell).toHaveClass('Cell-lit');
        } else {
          expect(cell).not.toHaveClass('Cell-lit');
        }
      });
    });

    it('says that you won when you click the board', function () {
      // create a board that can be completed in one click
      render(<Board numRows={1} numCols={3} oddsLit={1} />);

      // the game isn't won yet
      expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument();

      // clicking on the middle cell wins the game
      const cells = screen.getAllByRole('button');
      fireEvent.click(cells[1]);
      expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    });
  });
});
