import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {LoadingPageSpinner} from '~/shared/ui';
import {Button, ButtonText, Heading, Text} from '@gluestack-ui/themed';
import {GroupsListCard} from '~/entities/groups/groupsCard';
import {useMainNavigate} from '~/shared/route';
import {useFetchGetPreviewGroupList} from '../model/useFetchGetPreviewGroupList.ts';

const FallbackEmpty = () => {
  return (
    <StyledFallback>
      <Text>참가한 운동이 없습니다.</Text>
    </StyledFallback>
  );
};

export const PreviewGroupListSection = () => {
  const {isFetching, data} = useFetchGetPreviewGroupList();
  const {navigateDetailGroup, navigateAllGroupListPage} = useMainNavigate();

  if (isFetching) {
    return <LoadingPageSpinner />;
  }
  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <StyledContentsContainer>
            <StyledHeaderContainer>
              <StyledTitleGroup>
                <Heading size={'md'} color={'$textLight950'}>
                  최근에 활동한 모임
                </Heading>
              </StyledTitleGroup>
              <Button size={'sm'} variant={'link'} action={'secondary'} onPress={navigateAllGroupListPage}>
                <ButtonText>더보기</ButtonText>
              </Button>
            </StyledHeaderContainer>
            <StyledCardList>
              {data.length <= 0 ? (
                <FallbackEmpty />
              ) : (
                data.map((group, index) => (
                  <GroupsListCard key={`${index}--`} {...group} onPress={() => navigateDetailGroup(group.groupsId)} />
                ))
              )}
            </StyledCardList>
          </StyledContentsContainer>
        </StyledContainer>
      )}
      <StyledDivider />
    </Fragment>
  );
};

const StyledContainer = styled.View`
  padding: 0 20px 8px 20px;
`;

const StyledDivider = styled.View`
  height: 8px;
  background: #f6f6f6;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;

const StyledTitleGroup = styled.View`
  gap: 4px;
`;

const StyledContentsContainer = styled.View`
  padding: 20px 0 10px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledCardList = styled.View`
  gap: 8px;
  align-self: stretch;
`;

const StyledFallback = styled.View`
  justify-content: center;
  align-items: center;
  height: 160px;
`;
