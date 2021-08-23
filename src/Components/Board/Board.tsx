import React, { useState } from 'react';
import styled from 'styled-components';
import { GameBoard, GameItemValues } from './types';

const gameBoard = Array(9).fill(null);

export const Board: React.FC = () => {
  const [gameData, setGameData] = useState<GameBoard>({});

  const [isCross, setIsCross] = useState<boolean>(true);

  const handleSquareBtnClkCreator = (idx: number) => () => {
    const currentSquareValue = gameData[idx];
    //проверяем на тему того ходили мы в эту ячейку или нет
    if (currentSquareValue) {
      alert('вы уже походили в данную ячейку!');
      return;
    }

    //устанавливаем в ячеку крестик или нолик и
    setGameData((prev) => ({
      ...prev,
      [idx]: isCross ? GameItemValues.CROSS : GameItemValues.ZERO,
    }));
    //передаем ход противнику
    setIsCross((prev) => !prev);
  };

  return (
    <Wrap>
      {gameBoard.map((item, index) => (
        <Square key={index} onClick={handleSquareBtnClkCreator(index)}>
          {gameData[index]}
        </Square>
      ))}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  width: 330px;
  height: 330px;
  margin: auto;
`;

const Square = styled.button`
  font-size: 3rem;
  width: 100px;
  height: 100px;
`;
