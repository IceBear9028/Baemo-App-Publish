import React, {Fragment} from 'react';
import {Text} from '@gluestack-ui/themed';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {LoadingPageSpinner} from '~/shared/ui';
import {ExerciseIntro} from '~/shared/mapper/exercise';
import {AcceptUserCard} from '~/shared/ui/common/AcceptUserCard.tsx';
import {useFetchGetPendingList} from '../model/useFetchGetPendingList.ts';
import {useFetchPermissionGuest} from '../model/useFetchPermission.ts';

interface ExerciseGuestListProps extends Pick<ExerciseIntro, 'exerciseId'> {}

export const ExerciseThunderPendingList = ({exerciseId}: ExerciseGuestListProps) => {
  const {isPending, data, refetch} = useFetchGetPendingList(exerciseId);
  const {acceptPermission, rejectPermission} = useFetchPermissionGuest(exerciseId);
  if (isPending) {
    return <LoadingPageSpinner />;
  }
  if (data && data.length <= 0) {
    return (
      <StyledFallback>
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isPending} onRefresh={refetch} />}>
          <StyledPadding />
          <Text>운동 신청자가 없습니다.</Text>
        </StyledScrollContainer>
      </StyledFallback>
    );
  }
  return (
    <Fragment>
      {data && (
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isPending} onRefresh={refetch} />}>
          {data.map((item, index) => {
            const {userProfile} = item;
            return (
              <AcceptUserCard
                key={`${index}-${userProfile.name}`}
                onAccept={() => acceptPermission(exerciseId, userProfile.userId)}
                onReject={() => rejectPermission(exerciseId, userProfile.userId)}
                {...userProfile}
              />
            );
          })}
        </StyledScrollContainer>
      )}
    </Fragment>
  );
};

const StyledScrollContainer = styled.ScrollView``;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledPadding = styled.View`
  height: 320px;
`;
