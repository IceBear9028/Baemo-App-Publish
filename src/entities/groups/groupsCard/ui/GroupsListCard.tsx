import styled from 'styled-components/native';
import {Badge, BadgeText, Image, Text} from '@gluestack-ui/themed';
import {Groups} from '~/shared/mapper/groups';
import {HeadCountBadge} from '~/shared/ui';
import {useToken} from '@gluestack-style/react';
import LocationIcon from '~/shared/images/svg/exercise_location.svg';

interface GatheringCardProps extends Groups {
  onPress: () => void;
}

export const GroupsListCard = (props: GatheringCardProps) => {
  const colorToken = useToken('colors', 'light200');
  return (
    <StyledContainer borderColor={colorToken} onPress={props.onPress}>
      <Image style={{width: 90, height: 68, borderRadius: 8}} source={{uri: props.background}} alt="group-bg" />
      <StyledBody>
        <StyledInfoHeader>
          <StyledHeaderContainer>
            <Text size={'sm'} bold={true} numberOfLines={1} ellipsizeMode={'tail'}>
              {props.groupsName}
            </Text>
          </StyledHeaderContainer>
        </StyledInfoHeader>
        <Text size={'xs'}>{props.groupsDescription}</Text>
        <StyledLocationBadgeGroup>
          <StyledLocation>
            <StyledSubLocation>
              <LocationIcon />
              <Text size={'xs'}>지역</Text>
            </StyledSubLocation>
            <Badge size={'sm'}>
              <BadgeText>{props.location}</BadgeText>
            </Badge>
          </StyledLocation>
          {/* region 쪽이 아직 구현되지 않을 것 같아서 임시 비활성화 */}
          {/*{props.region.map((region, index) => (*/}
          {/*  <Badge key={`${region}-${index}`} size={'sm'}>*/}
          {/*    <BadgeText>{region}</BadgeText>*/}
          {/*  </Badge>*/}
          {/*))}*/}
          <HeadCountBadge headCount={props.headCount} />
        </StyledLocationBadgeGroup>
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity<{borderColor: string}>`
  flex-direction: row;
  padding: 10px 0;
  align-items: center;
  align-self: stretch;
  gap: 14px;
  border-bottom: 1px solid ${({borderColor}) => borderColor};
`;

const StyledBody = styled.View`
  flex: 1;
  gap: 4px;
`;

const StyledInfoHeader = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

const StyledHeaderContainer = styled.View`
  max-width: 70%;
`;

const StyledLocationBadgeGroup = styled.View`
  gap: 4px;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

const StyledLocation = styled.View`
  gap: 8px;
  flex-direction: row;
`;

const StyledSubLocation = styled.View`
  flex-direction: row;
  align-items: center;
`;
