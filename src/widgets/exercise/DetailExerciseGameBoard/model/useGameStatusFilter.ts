import {useState} from 'react';
import {FilterGameStatus} from '~/shared/mapper/exercise';

export function useGameStatusFilter() {
  const gameStatus = new FilterGameStatus();
  const filterKeys = Object.keys(gameStatus).reverse() as (keyof FilterGameStatus)[];
  const [filterStatus, setFilterStatus] = useState<keyof FilterGameStatus>('inProgress');

  function setChangeFilter(key: keyof FilterGameStatus) {
    setFilterStatus(() => key);
  }

  return {
    gameFilterOption: gameStatus,
    filterKeys,
    filterStatus,
    setChangeFilter,
  };
}
