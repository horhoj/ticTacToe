import { GameBoard, GameItemValues } from './types';

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Здесь мы проверяем закончилась ли игра чьей нибудь победой
export const gameOver = (gameBoard: GameBoard): null | GameItemValues => {
  let result = null;

  let winner: GameItemValues | null = null;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    result =
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c];
    if (result) {
      winner = result ? gameBoard[a] : null;
    }
  }

  return winner;
};

//если в gameBoard 9 элементов то доска считается заполненной
export const isBoardFullCheck = (gameBoard: GameBoard): boolean => {
  let result = 0;
  for (let i = 0; i < 9; i++) {
    if (gameBoard[i]) {
      result++;
    }
  }

  return result === 9;
};
