import styled from 'styled-components/native';
import {useFetchCommunityCategoryList} from '../model/useFetchCommunityCategoryList.ts';
import {CommunityCategoryCard} from '~/entities/community/communityCategoryCard/ui/CommunityCategoryCard.tsx';
import {useMainNavigate} from '~/shared/route';
import {LoadingPageSpinner} from '~/shared/ui';
import React from 'react';
import {RefreshControl} from 'react-native';

export const CommunityCategoryList = () => {
  const {navigateCommunityCategoryArticleListPage} = useMainNavigate();
  const {isFetching, data, refetch} = useFetchCommunityCategoryList();

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  return (
    <StyledScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
      <StyledContainer>
        {data &&
          data.map((category, index) => {
            return (
              <CommunityCategoryCard key={`${index}==`} onPress={() => navigateCommunityCategoryArticleListPage(category)} {...category} />
            );
          })}
      </StyledContainer>
    </StyledScrollView>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  gap: 12px;
`;

const StyledScrollView = styled.ScrollView`
  padding: 16px 20px;
  gap: 16px;
`;
