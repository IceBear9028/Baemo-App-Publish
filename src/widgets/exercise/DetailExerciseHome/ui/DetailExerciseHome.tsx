import React from 'react';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailExerciseIntroduction, useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';
import {PresentDetailGameList} from 'features/game/presentDetailGameList';
import {useRefreshExerciseHome} from '../model/useRefreshExerciseHome.ts';

interface DetailExerciseHomeProps extends Pick<NativeStackScreenProps<RootMainStackParamList, 'detailExercisePage'>, 'route'> {}

export const DetailExerciseHome = ({route}: DetailExerciseHomeProps) => {
  const {role, exerciseId} = useExerciseRoleStore();
  const {isFetching, refreshList} = useRefreshExerciseHome(exerciseId);
  return (
    <StyledContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refreshList} />}>
      <DetailExerciseIntroduction {...route.params} />
      <PresentDetailGameList exerciseId={exerciseId} exerciseRole={role} />
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView``;
