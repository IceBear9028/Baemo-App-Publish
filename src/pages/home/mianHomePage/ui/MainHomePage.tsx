import React from 'react';
import styled from 'styled-components/native';
import {HomeExerciseList} from '~/features/exercise/homeExerciseList';
import {PreviewGroupListSection} from '~/features/groups/previewGroupsList';
import {MainButtonGroup} from './MainButtonGroup.tsx';
import {RefreshControl} from 'react-native';
import {useRefreshHome} from '../model/useRefreshHome.ts';
import {ServiceNoticeBanner} from '~/widgets/serviceNotice/serviceNoticeBanner';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';

export const MainHomePage = () => {
  const {isFetching, refresh} = useRefreshHome();

  return (
    <ApiErrorBoundary>
      <StyledContainer>
        <StyledScrollContainer overScrollMode="never" refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
          <ServiceNoticeBanner />
          <PreviewGroupListSection />
          <HomeExerciseList />
          <StyledPadding />
        </StyledScrollContainer>
        <MainButtonGroup />
      </StyledContainer>
    </ApiErrorBoundary>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledScrollContainer = styled.ScrollView`
  overflow: visible;
  position: relative;
  background: #ffffff;
`;

const StyledPadding = styled.View`
  height: 120px;
`;
