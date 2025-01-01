import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {useFetchGetUserExerciseList} from '~/features/user/userExerciseList/model/useFetchGetUserExerciseList.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {Fragment} from 'react';
import {UserProfileTabBarRoute} from '~/pages/profile/userProfilePage/ui/UserProfilePage.tsx';
import {LoadingPageSpinner} from '~/shared/ui';
import {Text} from '@gluestack-ui/themed';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';

type UserExerciseListProps = RouteProp<UserProfileTabBarRoute, 'userGames'>;

const FallbackEmpty = () => {
  return (
    <StyledFallback>
      <Text>참가한 운동이 없습니다.</Text>
    </StyledFallback>
  );
};

export const UserExerciseList = () => {
  const route = useRoute<UserExerciseListProps>();
  const {userId} = route.params;

  const {navigateDetailExercise} = useMainNavigate();
  const {isFetching, isError, data} = useFetchGetUserExerciseList(userId);

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  if (isError) {
    return <LoadingPageSpinner />;
  }

  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <StyledCardList>
            {data.length <= 0 ? (
              <FallbackEmpty />
            ) : (
              data.map(exercise => {
                return <ExerciseCard onPress={() => navigateDetailExercise(exercise.exerciseId)} {...exercise} />;
              })
            )}
          </StyledCardList>
        </StyledContainer>
      )}
    </Fragment>
  );
};

const StyledContainer = styled.ScrollView`
  padding: 10px 20px;
`;

const StyledCardList = styled.View`
  gap: 8px;
  align-self: stretch;
  margin-bottom: 20px;
`;

const StyledFallback = styled.View`
  justify-content: center;
  align-items: center;
  height: 160px;
`;
