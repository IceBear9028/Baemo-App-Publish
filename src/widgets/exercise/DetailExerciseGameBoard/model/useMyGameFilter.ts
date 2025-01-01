import {useState} from 'react';

export function useMyGameFilter() {
  const [isMyGame, setIsMyGame] = useState<boolean>(false);
  function filterMyGame() {
    setIsMyGame(prev => !prev);
  }
  return {
    isMyGame,
    filterMyGame,
  };
}
