import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {RootMainStackParamList} from '~/shared/route';
import {DetailGameList} from 'widgets/game/detailGameList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGameStatusFilter} from '../model/useGameStatusFilter.ts';
import {useMyGameFilter} from '../model/useMyGameFilter.ts';
import {MyGameFilter} from './MyGameFilter.tsx';
import {StatusGameFilter} from '~/widgets/exercise/DetailExerciseGameBoard/ui/StatusGameFilter.tsx';
import {FilterContainer} from '~/shared/ui';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

interface DetailExerciseGameBoardProps extends Pick<NativeStackScreenProps<RootMainStackParamList, 'detailExercisePage'>, 'route'> {}

export const DetailExerciseGameBoard = ({route}: DetailExerciseGameBoardProps) => {
  const {exerciseId} = route.params;
  const {status} = useExerciseRoleStore();
  const {isMyGame, filterMyGame} = useMyGameFilter();
  const {filterStatus, setChangeFilter} = useGameStatusFilter();

  // 운동이 종료되었으면 상
  if (status === 'COMPLETE') {
  }

  return (
    <Fragment>
      <StyledContainer>
        <FilterContainer>
          {status !== 'COMPLETE' && <StatusGameFilter gameFilterStatus={filterStatus} setFilterStatus={setChangeFilter} />}
          <MyGameFilter isMyGame={isMyGame} filterMyGame={filterMyGame} />
        </FilterContainer>
        {status !== 'COMPLETE' ? (
          <DetailGameList isMyGame={isMyGame} filterStatus={filterStatus} role={'ADMIN'} exerciseId={exerciseId} />
        ) : (
          <DetailGameList isMyGame={isMyGame} role={'ADMIN'} exerciseId={exerciseId} />
        )}
      </StyledContainer>
    </Fragment>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
