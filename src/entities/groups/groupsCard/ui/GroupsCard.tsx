import styled from 'styled-components/native';
import {Badge, BadgeText, Text} from '@gluestack-ui/themed';
import {Groups} from '~/shared/mapper/groups';
import {GroupsThumbnail, HeadCountBadge} from '~/shared/ui';
import LocationIcon from '~/shared/images/svg/exercise_location.svg';

interface GatheringCardProps extends Groups {
  onPress: () => void;
}

export const GroupsCard = (props: GatheringCardProps) => {
  return (
    <StyledContainer onPress={props.onPress}>
      <GroupsThumbnail src={props.background} />
      <StyledHeader>
        <StyledHeaderContainer>
          <Text size={'sm'} bold={true} numberOfLines={1} ellipsizeMode={'tail'}>
            {props.groupsName}
          </Text>
        </StyledHeaderContainer>
        <HeadCountBadge headCount={props.headCount} />
      </StyledHeader>
      <StyledBody>
        <Text size={'xs'}>{props.groupsDescription}</Text>
        <StyledLocationBadgeGroup>
          <LocationIcon />
          <Badge size={'sm'}>
            <BadgeText>{props.location}</BadgeText>
          </Badge>

          {/* region 쪽이 아직 구현되지 않을 것 같아서 임시 비활성화 */}
          {/*{props.region.map((region, index) => (*/}
          {/*  <Badge key={`${region}-${index}`} size={'sm'}>*/}
          {/*    <BadgeText>{region}</BadgeText>*/}
          {/*  </Badge>*/}
          {/*))}*/}
        </StyledLocationBadgeGroup>
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  width: 186px;
  height: 180px;
  background: #ffffff;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #dfdfdf;
`;

const StyledHeader = styled.View`
  padding: 6px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const StyledHeaderContainer = styled.View`
  max-width: 130px;
`;

const StyledBody = styled.View`
  flex-direction: column;
  padding-left: 10px;
  gap: 6px;
  align-self: stretch;
`;

const StyledLocationBadgeGroup = styled.View`
  gap: 4px;
  flex-direction: row;
  align-self: stretch;
`;
