import {useState} from 'react';
import {GameStatus} from '~/shared/mapper/exercise';

export function usePlayerStatusFilter() {
  const playerStatus = new GameStatus();
  const filterKeys = Object.keys(playerStatus) as ('all' | keyof GameStatus)[];
  const [filterStatus, setFilterStatus] = useState<'all' | keyof GameStatus>('all');

  function setChangeFilter(key: 'all' | keyof GameStatus) {
    setFilterStatus(() => key);
  }

  return {
    playerFilterOption: filterStatus,
    filterKeys,
    filterStatus,
    setChangeFilter,
  };
}
