import styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {DetailGroupsIntroduction} from '~/features/groups/detailGroupsIntroduction';
import {ExerciseListOfGroupSection} from '~/features/exercise/exerciseListOfGroupSection';
import {DetailGatheringTabRoute} from '~/pages/groups/detailGroupsPage/ui/DetailGroupsPage.tsx';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {useRefreshHome} from '~/widgets/groups/DetailGroupsHome/model/useRefreshHome.ts';
import {RefreshControl} from 'react-native';
import React from 'react';

type DetailGatheringHomeProps = {
  route: RouteProp<DetailGatheringTabRoute, 'home'>;
  navigation: any;
};

export const DetailGroupsHome = ({route}: DetailGatheringHomeProps) => {
  const groupsId = route.params.groupsId;
  const {isPending, refresh} = useRefreshHome();
  return (
    <ApiErrorBoundary>
      <StyledContainer refreshControl={<RefreshControl refreshing={isPending} onRefresh={() => refresh(groupsId)} />}>
        <DetailGroupsIntroduction route={route} />
        <ExerciseListOfGroupSection groupsId={route.params.groupsId} />
      </StyledContainer>
    </ApiErrorBoundary>
  );
};

const StyledContainer = styled.ScrollView`
  flex: 1;
`;
