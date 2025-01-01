import React from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {ArticleCard} from '~/entities/community/articleCard';
import {ArticleCommunityCategoryId} from '../api/fetchGetCommunityCategoryArticle.ts';
import {useFetchCommunityCategoryArticle} from '../model/useFetchCommunityCategoryArticle.ts';
import {LoadingPageSpinner} from '~/shared/ui';

interface GroupArticlesProps {
  articleCategoryId: ArticleCommunityCategoryId;
}

export const CommunityCategoryArticleList = ({articleCategoryId}: GroupArticlesProps) => {
  const {navigateDetailArticle} = useMainNavigate();
  const {data, isFetching, isError} = useFetchCommunityCategoryArticle(articleCategoryId);

  if (isError) {
    return <Text>아 tlqkffhadk 동작안해</Text>;
  }

  return (
    <StyledContainer>
      <StyledArticleCardContainer>
        {data &&
          data.articleList.map(article => (
            <ArticleCard key={`${article.title}${article.id}`} onPress={() => navigateDetailArticle(article)} {...article} />
          ))}
      </StyledArticleCardContainer>
      {isFetching && <LoadingPageSpinner />}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledArticleCardContainer = styled.ScrollView`
  flex-direction: column;
  padding: 0 20px;
`;
