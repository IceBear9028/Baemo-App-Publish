import React, {Fragment} from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {ExerciseIntro} from '~/shared/mapper/exercise';
import {AcceptUserCard} from '~/shared/ui/common/AcceptUserCard.tsx';
import {useGetJoinRequest} from '../model/useGetJoinRequest.ts';
import {LoadingPageSpinner} from '~/shared/ui';
import {useFetchPermissionGuest} from '~/features/exercise/exerciseApplyGuestList/model/useFetchPermissionGuest.ts';
import {RefreshControl} from 'react-native';

interface ExerciseGuestListProps extends Pick<ExerciseIntro, 'exerciseId'> {}

export const ExerciseApplyGuestList = ({exerciseId}: ExerciseGuestListProps) => {
  const {isPending, data, refetch} = useGetJoinRequest(exerciseId);
  const {acceptPermission, rejectPermission} = useFetchPermissionGuest(exerciseId);
  if (isPending) {
    return <LoadingPageSpinner />;
  }
  if (data && data.length <= 0) {
    return (
      <StyledFallback>
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isPending} onRefresh={refetch} />}>
          <StyledPadding />
          <Text>게스트 신청자가 없습니다.</Text>
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
                subTitle={item.appliedName !== item.userProfile.name ? `신청자 | ${item.appliedName}` : ''}
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
