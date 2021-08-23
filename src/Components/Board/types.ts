export enum GameItemValues {
  CROSS = 'X',
  ZERO = 'O',
}

export interface GameBoard {
  [keys: number]: GameItemValues;
}
