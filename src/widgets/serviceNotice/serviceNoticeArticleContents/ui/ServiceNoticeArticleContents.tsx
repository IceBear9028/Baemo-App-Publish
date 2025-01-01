import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {ArticleStatusBadge, ImageList, LoadingPageSpinner, ProfileInfoCard} from '~/shared/ui';
import {useFetchServiceNoticeArticle} from '../model/useFetchServiceNoticeArticle.ts';
import {Heading, Text} from '@gluestack-ui/themed';
import {formatTimeDifference} from '~/shared/utils';
import {RootMainStackParamList} from '~/shared/route';

type ServiceNoticeArticleProps = RootMainStackParamList['serviceNoticeDetailPage'];

export const ServiceNoticeArticleContents = ({id}: ServiceNoticeArticleProps) => {
  const {isFetchingArticle, data} = useFetchServiceNoticeArticle(id);
  const articleImageList = data?.detailArticle.imageAll.map(item => ({uri: item.path}));
  const diffTime = formatTimeDifference(data?.detailArticle.createDate);

  if (isFetchingArticle) {
    return <LoadingPageSpinner />;
  }

  return data ? (
    <Fragment>
      <StyledContainer>
        <StyledContentsContainer>
          <StyledHeaderContainer>
            <BadgeContainer>
              <ArticleStatusBadge status={data.detailArticle.status} />
            </BadgeContainer>
            <StyledTitleContainer>
              <Heading size={'lg'}>{data.detailArticle.title}</Heading>
              <StyledInfoContainer>
                <Text size={'sm'} color={'$textLight400'}>
                  {diffTime}
                </Text>
                <Text size={'sm'} color={'$textLight400'}>
                  |
                </Text>
                <Text size={'sm'} color={'$textLight400'}>{`조회수 ${data.detailArticle.views}`}</Text>
              </StyledInfoContainer>
            </StyledTitleContainer>
            <StyledProfileContainer>
              <ProfileInfoCard {...data?.author} />
            </StyledProfileContainer>
          </StyledHeaderContainer>
        </StyledContentsContainer>
        {data && <ImageList srcList={articleImageList} />}
      </StyledContainer>
    </Fragment>
  ) : (
    <Fragment />
  );
};

const StyledContainer = styled.View`
  gap: 14px;
  padding: 10px 20px 20px 20px;
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
