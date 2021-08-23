import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GameBoard, GameItemValues } from './types';
import { gameOver, isBoardFullCheck } from './helpers';

const gameBoard = Array(9).fill(null);

export const Board: React.FC = () => {
  const [gameData, setGameData] = useState<GameBoard>({});

  const [isCross, setIsCross] = useState<boolean>(true);

  const [statusMsg, setStatusMsg] = useState<string>('');

  //это запуск новой игры
  const newGame = () => {
    setGameData({});
    setIsCross(true);
    setStatusMsg('');
  };

  useEffect(() => {
    newGame();
  }, []);

  // этот useEffect вызывается при любом изменении игрового поля.
  // и определяет завершилась игра в ничью или чьей либо победой
  useEffect(() => {
    const currentWinner = gameOver(gameData);
    if (currentWinner) {
      const msg = `Игра завершена, победа за ${currentWinner}`;
      alert(msg);
      newGame();
      setStatusMsg('');
      return;
    }

    const isBoardFull = isBoardFullCheck(gameData);
    if (isBoardFull && !currentWinner) {
      const msg = `Игра завершена вничью`;
      alert(msg);
      newGame();
      setStatusMsg('');
      return;
    }

    const msg = `сейчас ходит: ${
      isCross ? GameItemValues.CROSS : GameItemValues.ZERO
    }`;
    setStatusMsg(msg);
  }, [gameData]);

  const handleSquareBtnClkCreator = (idx: number) => () => {
    const currentSquareValue = gameData[idx];
    //проверяем на тему того ходили мы в эту ячейку или нет
    if (currentSquareValue) {
      alert('вы уже походили в данную ячейку!');
      return;
    }

    //устанавливаем в ячейку крестик или нолик и
    setGameData((prev) => ({
      ...prev,
      [idx]: isCross ? GameItemValues.CROSS : GameItemValues.ZERO,
    }));
    //передаем ход противнику
    setIsCross((prev) => !prev);
  };

  return (
    <Wrap>
      <StatusBar>{statusMsg}</StatusBar>
      <BoardWrap>
        {gameBoard.map((item, index) => (
          <Square key={index} onClick={handleSquareBtnClkCreator(index)}>
            {gameData[index]}
          </Square>
        ))}
      </BoardWrap>
    </Wrap>
  );
};

const StatusBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const Wrap = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const BoardWrap = styled.div`
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
