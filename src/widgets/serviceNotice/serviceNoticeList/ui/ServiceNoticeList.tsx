import React, {Fragment} from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {RefreshControl} from 'react-native';
import {useFetchGetServiceNoticeList} from '../model/useFetchGetServiceNoticeList.ts';
import {ServiceNoticeCard} from '~/features/serviceNotice/serviceNoticeCard';

export const ServiceNoticeList = () => {
  const {navigateServiceNoticeDetailPage} = useMainNavigate();
  const {isFetching, refetch, data} = useFetchGetServiceNoticeList();

  if (!data?.length) {
    return (
      <StyledFallbackContainer>
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <StyledPadding />
          <StyledTextContainer>
            <Text size="sm">{'아직 등록된 게시물이'}</Text>
            <Text size="sm">{'없습니다.'}</Text>
          </StyledTextContainer>
        </StyledScrollContainer>
      </StyledFallbackContainer>
    );
  }

  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <StyledScrollContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
            <StyledCardList>
              {data.map((article, index) => (
                <ServiceNoticeCard key={`${index}--`} onPress={() => navigateServiceNoticeDetailPage(article.id)} {...article} />
              ))}
            </StyledCardList>
          </StyledScrollContainer>
        </StyledContainer>
      )}
    </Fragment>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding-bottom: 8px;
`;

const StyledScrollContainer = styled.ScrollView``;

const StyledFallbackContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledContentsContainer = styled.View`
  padding: 20px 20px 10px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledCardList = styled.View`
  gap: 8px;
  padding: 10px 20px;
`;

const StyledPadding = styled.View`
  height: 340px;
`;

const StyledTextContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
