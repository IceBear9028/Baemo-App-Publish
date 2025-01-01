import {Filter, FilterContainer, FilterOption} from '~/shared/ui';
import {GameStatus} from '~/shared/mapper/exercise';

interface PlayerStatusFilterProps {
  playerStatus: 'all' | keyof GameStatus;
  onChange: (input: 'all' | keyof GameStatus) => void;
}

export const PlayerStatusFilter = ({playerStatus, onChange}: PlayerStatusFilterProps) => {
  console.log(playerStatus);
  return (
    <FilterContainer>
      <Filter onChange={onChange} initOption={playerStatus}>
        <FilterOption name={'전체'} value={'all'} />
        <FilterOption name={'게임 없음'} value={6} />
        <FilterOption name={'대기'} value={0} />
        <FilterOption name={'다음'} value={1} />
        <FilterOption name={'진행 중'} value={2} />
      </Filter>
    </FilterContainer>
  );
};
