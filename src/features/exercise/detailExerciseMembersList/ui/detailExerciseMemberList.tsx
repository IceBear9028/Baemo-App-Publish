import React from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {LoadingPageSpinner} from '~/shared/ui';
import {ExerciseIntro} from '~/shared/mapper/exercise';
import {ExerciseMemberCard} from '~/entities/exercise/exerciseMemberCard';
import {useFetchGetExerciseMembers} from '../model/useFetchGetExerciseMembers.ts';
import {RefreshControl} from 'react-native';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

interface DetailExerciseMemberListProps extends Pick<ExerciseIntro, 'exerciseId' | 'exerciseStatus'> {
  filter: 'waiting' | 'participate';
}

export const DetailExerciseMemberList = ({exerciseId, filter, exerciseStatus}: DetailExerciseMemberListProps) => {
  const {isFetching, data, refetch} = useFetchGetExerciseMembers(exerciseId, filter);
  if (isFetching) {
    return <LoadingPageSpinner />;
  }
  if (data && data.length <= 0) {
    return (
      <StyledFallback>
        <Text>운동 참가자가 없습니다.</Text>
      </StyledFallback>
    );
  }
  return (
    <StyledContainer>
      {data && (
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          {data.map((groupUser, index) => (
            <ExerciseMemberCard
              key={`${index}-${groupUser.userProfile.userId}`}
              exerciseId={exerciseId}
              exerciseStatus={exerciseStatus}
              {...groupUser}
            />
          ))}
        </StyledScrollContainer>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledScrollContainer = styled.ScrollView``;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
