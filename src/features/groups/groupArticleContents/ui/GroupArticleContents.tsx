import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {ArticleStatusBadge, ImageList, LoadingPageSpinner, ProfileInfoCard} from '~/shared/ui';
import {useFetchGroupArticle} from '../model/useFetchGroupArticle.ts';
import {Heading, Text} from '@gluestack-ui/themed';
import {formatTimeDifference} from '~/shared/utils';
import {RootMainStackParamList} from '~/shared/route';
import {GroupArticleLikeButton} from '~/entities/groups/groupAriticleLikeButton';

type GroupArticleContentsProps = RootMainStackParamList['detailGroupArticlePage'];

export const GroupArticleContents = (props: GroupArticleContentsProps) => {
  const {id, groupsId} = props;
  const {isFetchingArticle, data} = useFetchGroupArticle(groupsId, id);

  const articleImageList = data?.article.imageAll.map(item => ({uri: item.path}));
  const diffTime = data && formatTimeDifference(data.article.createDate);

  if (isFetchingArticle) {
    return <LoadingPageSpinner />;
  }

  return data ? (
    <Fragment>
      <StyledContainer>
        <StyledContentsContainer>
          <StyledHeaderContainer>
            <BadgeContainer>
              <ArticleStatusBadge status={data.article.status} />
            </BadgeContainer>
            <StyledTitleContainer>
              <Heading size={'lg'}>{data.article.title}</Heading>
              <StyledInfoContainer>
                <Text size={'sm'} color={'$textLight400'}>
                  {diffTime}
                </Text>
                <Text size={'sm'} color={'$textLight400'}>
                  |
                </Text>
                <Text size={'sm'} color={'$textLight400'}>{`조회수 ${data.article.views}`}</Text>
              </StyledInfoContainer>
            </StyledTitleContainer>
            <StyledProfileContainer>
              <ProfileInfoCard {...data?.author} />
            </StyledProfileContainer>
          </StyledHeaderContainer>
          <Text>{data.article.contentAll}</Text>
        </StyledContentsContainer>
        {data && <ImageList srcList={articleImageList} />}
      </StyledContainer>
      <StyledStatusContainer>
        <StyledStatusInputGroups>
          <GroupArticleLikeButton {...props} {...data.article} />
        </StyledStatusInputGroups>
      </StyledStatusContainer>
    </Fragment>
  ) : (
    <Fragment />
  );
};

const StyledContainer = styled.View`
  gap: 14px;
  padding: 10px 20px 20px 20px;
`;

const StyledStatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px 30px 20px;
`;

const StyledStatusInputGroups = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const StyledContentsContainer = styled.View`
  gap: 24px;
`;

const StyledHeaderContainer = styled.View`
  gap: 8px;
  border-bottom-color: #eaeaea;
  border-bottom-width: 1px;
`;

const BadgeContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const StyledTitleContainer = styled.View`
  gap: 2px;
`;

const StyledProfileContainer = styled.View`
  padding: 12px 0;
`;

const StyledInfoContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;
