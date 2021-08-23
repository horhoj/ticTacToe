import React from 'react';
import { Board } from './Components/Board';
import { Container } from './GlobalStyles';

export const App: React.FC = () => {
  return (
    <Container>
      <Board />
    </Container>
  );
};
