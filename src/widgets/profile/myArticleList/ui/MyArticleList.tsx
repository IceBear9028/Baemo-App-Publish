import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import {FeatureDivider, Filter, FilterContainer, FilterOption} from '~/shared/ui';
import {useFetchGetMyArticleList} from '../model/useFetchGetMyArticleList.ts';
import {useFilterMyArticle} from '../model/useFilterMyArticle.ts';
import {ArticleCard} from '~/entities/community/articleCard';
import {useMainNavigate} from '~/shared/route';

export const MyArticleList = () => {
  const {navigateDetailArticle} = useMainNavigate();
  const {filterOptions, onChangeFilter, filterStatus} = useFilterMyArticle();
  const {isError, data} = useFetchGetMyArticleList(filterStatus);

  if (isError) {
    return <Text>에러발생</Text>;
  }

  return (
    <StyledContainer>
      <StyledScrollContainer>
        <FilterContainer>
          <Filter initOption={filterStatus} onChange={onChangeFilter}>
            <FilterOption name={'1주일 전'} value={filterOptions[0]} />
            <FilterOption name={'1달 전'} value={filterOptions[1]} />
            <FilterOption name={'3달 전'} value={filterOptions[2]} />
          </Filter>
        </FilterContainer>
        <FeatureDivider />
        <StyledCardContainer>
          {data &&
            data.articleList.map((article, index) => (
              <ArticleCard key={`${article.createDate}-${index}`} onPress={() => navigateDetailArticle(article)} {...article} />
            ))}
        </StyledCardContainer>
      </StyledScrollContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledScrollContainer = styled.ScrollView`
  width: 100%;
`;

const StyledCardContainer = styled.View`
  padding: 0 20px;
`;
