import React from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {Groups} from '~/shared/mapper/groups';
import {useMainNavigate} from '~/shared/route';
import {Filter, FilterContainer, FilterOption} from '~/shared/ui';
import {ArticleGroupCategoryId, PreviewGroupNoticeArticleList} from '~/widgets/groups/groupArticleList';
import {useFetchInfiniteGroupArticle} from '../model/useFetchInfiniteGroupArticle.ts';
import {useRefreshGroupArticle} from '~/widgets/groups/groupArticleList/model/useRefreshGroupArticle.ts';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {GroupArticleCard} from '~/features/groups/groupArticleCard';
import {useArticleCategoryFilter} from '~/pages/groups/detailGroupsPage/model/useArticleCategoryFilter.ts';

interface GroupArticlesProps extends Pick<Groups, 'groupsId'> {
  articleCategoryId: ArticleGroupCategoryId;
}

export const GroupArticlesList = ({groupsId, articleCategoryId}: GroupArticlesProps) => {
  const {navigationDetailGroupArticle} = useMainNavigate();
  const {isPending, refreshList} = useRefreshGroupArticle();
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isFetching} = useFetchInfiniteGroupArticle(
    articleCategoryId,
    groupsId,
  );

  return (
    <FlatList
      data={data?.pages.flatMap(page => page)}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      keyExtractor={(item, id) => `${item.id}-${id}`}
      onEndReachedThreshold={0.8}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      ListEmptyComponent={() => (
        <StyledFallbackContainer>
          <StyledScrollContainer refreshControl={<RefreshControl refreshing={isPending} onRefresh={refreshList} />}>
            <StyledPadding />
            <StyledTextContainer>
              <Text size="sm">{'아직 등록된 게시물이'}</Text>
              <Text size="sm">{'없습니다.'}</Text>
            </StyledTextContainer>
          </StyledScrollContainer>
        </StyledFallbackContainer>
      )}
      ListHeaderComponent={() => <>{articleCategoryId === 'all' && <PreviewGroupNoticeArticleList groupsId={groupsId} />}</>}
      renderItem={({item}) => {
        const navigateDetail = () => {
          navigationDetailGroupArticle(item.id, groupsId);
        };
        return <GroupArticleCard key={`${item.id}-${item.title}`} onPress={navigateDetail} groupsId={groupsId} {...item} />;
      }}
      ListFooterComponent={() => (isFetchingNextPage ? <ActivityIndicator style={styles.indicatorStyle} /> : <StyledFooterDivider />)}
    />
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const StyledScrollContainer = styled.ScrollView``;

const StyledFallbackContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledCardContainer = styled.View`
  padding: 4px 20px;
`;

const StyledFooterDivider = styled.View`
  height: 86px;
`;

const StyledPadding = styled.View`
  height: 280px;
`;

const StyledTextContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
