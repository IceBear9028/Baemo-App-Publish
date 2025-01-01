import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {FlatList, ListRenderItem} from 'react-native';
import {EditIcon, FabIcon} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {Article} from '~/shared/mapper/community';
import {ArticleCard} from '~/entities/community/articleCard';
import {useFetchGetFeedList} from '~/widgets/community/feed/model/useFetchGetFeedList.tsx';
import {FabButton, LoadingPageSpinner} from '~/shared/ui';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {CommunityArticleCard} from '~/features/community/communityArticleCard';

export const Feed = () => {
  const {navigateDetailArticle, navigateCommunityWriteArticlePage} = useMainNavigate();
  const {isFetching, data} = useFetchGetFeedList();

  const renderItem: ListRenderItem<Article> = ({item}) => <CommunityArticleCard onPress={() => navigateDetailArticle(item)} {...item} />;
  const keyExtractor = (item: Article) => item.id;

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  // data 속성에서 계속 타입 에러 발생.
  // Styled Component 에서 일으키는 에러인것 같음. 문제 보이지 않아서 ts-ignore 처리 [2024.06.14]
  return (
    <ApiErrorBoundary>
      <Fragment>
        {data && (
          <Fragment>
            {/*@ts-ignore*/}
            <StyledFlatList data={data.articleList} renderItem={renderItem} keyExtractor={keyExtractor} />
            <FabButton icon={<FabIcon as={EditIcon} />} title={'글쓰기'} onPress={() => navigateCommunityWriteArticlePage()} />
          </Fragment>
        )}
      </Fragment>
    </ApiErrorBoundary>
  );
};

const StyledFlatList = styled(FlatList as new () => FlatList<Article>)`
  padding: 0 20px;
`;
