import React from 'react';
import styled from 'styled-components/native';
import {Badge, BadgeText, Text} from '@gluestack-ui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailGatheringTabRoute} from '~/pages/groups/detailGroupsPage/ui/DetailGroupsPage.tsx';
import LocationIcon from '~/shared/images/svg/exercise_location.svg';
import GroupIcon from '~/shared/images/svg/exercise_group_outlined.svg';
import {FeatureDivider, GroupsBackground, LoadingPageSpinner, RectThumbnail} from '~/shared/ui';
import {useFetchGetGroupIntro} from '../model/useFetchGetGroupIntro.ts';

interface DetailGatheringIntroductionProps extends Pick<NativeStackScreenProps<DetailGatheringTabRoute, 'home'>, 'route'> {}

export const DetailGroupsIntroduction = ({route}: DetailGatheringIntroductionProps) => {
  console.log('route', route.params.groupsId);
  const {isFetching, data} = useFetchGetGroupIntro(route.params.groupsId);

  if (isFetching) {
    return <LoadingPageSpinner />;
  }
  return (
    <React.Fragment>
      <StyledContainer>
        <GroupsBackground src={data?.background} />
        <StyledHeader>
          <RectThumbnail src={data?.gatheringThumbnail} />
          <StyledHeaderTextContainer>
            <Text size={'lg'} bold={true}>
              {data?.groupsName}
            </Text>
            <Text size={'xs'} bold={true}>
              {data?.groupsDescription}
            </Text>
          </StyledHeaderTextContainer>
        </StyledHeader>
        <StyledInfoGroupContainer>
          <StyledInfoContainer>
            <StyledSubTitle>
              <GroupIcon />
              <Text size={'sm'} bold={true}>
                총원
              </Text>
            </StyledSubTitle>
            <Text size={'sm'} bold={true}>
              {`${data && data.headCount}`}
            </Text>
          </StyledInfoContainer>
          <StyledInfoContainer>
            <StyledSubTitle>
              <LocationIcon />
              <Text size={'sm'} bold={true}>
                지역
              </Text>
            </StyledSubTitle>
            <Badge>
              <BadgeText>{data?.location}</BadgeText>
            </Badge>
          </StyledInfoContainer>
        </StyledInfoGroupContainer>
        <Text size={'sm'}>{data?.introduction}</Text>
      </StyledContainer>
      <FeatureDivider />
    </React.Fragment>
  );
};

const StyledContainer = styled.View`
  padding: 20px 20px 30px 20px;
  flex-direction: column;
  align-self: stretch;
  gap: 20px;
`;

const StyledHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledHeaderTextContainer = styled.View`
  flex-direction: column;
  gap: 6px;
`;

const StyledInfoGroupContainer = styled.View`
  gap: 8px;
`;

const StyledInfoContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const StyledSubTitle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
