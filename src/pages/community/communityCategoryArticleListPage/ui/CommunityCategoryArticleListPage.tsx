import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList, useMainNavigate} from '~/shared/route';
import {CommunityCategoryArticleList} from '~/features/community/communityCategoryArticleList';
import {FabButton} from '~/shared/ui';
import {EditIcon, FabIcon} from '@gluestack-ui/themed';
import React from 'react';

type DetailCategoryCommunityPageProps = {} & NativeStackScreenProps<RootMainStackParamList, 'detailCommunityCategoryPage'>;

export const CommunityCategoryArticleListPage = ({route}: DetailCategoryCommunityPageProps) => {
  const {navigateCommunityWriteArticlePage} = useMainNavigate();

  function moveWritePage() {
    navigateCommunityWriteArticlePage(route.params);
  }

  return (
    <StyledContainer>
      <CommunityCategoryArticleList articleCategoryId={route.params.status} />
      <FabButtonContainer>
        <FabButton title={'글쓰기'} icon={<FabIcon as={EditIcon} />} onPress={moveWritePage} />
      </FabButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const FabButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  right: 4px;
`;
