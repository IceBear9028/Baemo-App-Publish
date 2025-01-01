import {FilterGameStatus} from '~/shared/mapper/exercise';
import {Filter, FilterOption} from '~/shared/ui';

interface StatusGameFilterProps {
  gameFilterStatus: keyof FilterGameStatus;
  setFilterStatus: (filter: keyof FilterGameStatus) => void;
}

export const StatusGameFilter = ({gameFilterStatus, setFilterStatus}: StatusGameFilterProps) => {
  const filterStatus = new FilterGameStatus();
  return (
    <Filter initOption={gameFilterStatus} onChange={setFilterStatus}>
      <FilterOption name={filterStatus.inProgress} value={'inProgress'} />
      <FilterOption name={filterStatus.completed} value={'completed'} />
    </Filter>
  );
};
