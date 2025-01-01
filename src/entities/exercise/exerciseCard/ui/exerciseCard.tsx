import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import {Exercise} from '~/shared/mapper/exercise';
import {useToken} from '@gluestack-style/react';
import LocationIcon from '~/shared/images/svg/exercise_location.svg';
import StartTimeIcon from '~/shared/images/svg/exercise_calendar.svg';
import {ExerciseStatusBadge, ExerciseTypeBadge, HeadCountBadge, RectThumbnail} from '~/shared/ui';
import {transformDateTime} from 'shared/utils';

interface ExerciseCardProps extends Exercise {
  onPress: () => void;
}

export const ExerciseCard = ({
  exerciseStatus,
  exerciseType,
  exerciseThumbnail,
  name,
  headCount,
  currentHeadCount,
  startDate,
  location,
  onPress,
  groupName,
}: ExerciseCardProps) => {
  const colorToken = useToken('colors', 'light200');
  return (
    <StyledContainer borderColor={colorToken} onPress={onPress}>
      <RectThumbnail src={exerciseThumbnail} />
      <StyledUpBody>
        <StyledInfoHeader>
          <StyledInfoSubHeader>
            <ExerciseStatusBadge status={exerciseStatus} />
            <StyledHeaderTextContainer>
              <Text bold={true} size={'sm'} numberOfLines={1} ellipsizeMode={'tail'} color={'$textLight900'}>
                {name}
              </Text>
            </StyledHeaderTextContainer>
          </StyledInfoSubHeader>
          <HeadCountBadge headCount={headCount} currentHeadCount={currentHeadCount} />
        </StyledInfoHeader>
        <StyledInfoBody>
          <StyledInfoDetail>
            <StartTimeIcon />
            <Text size={'xs'}>{transformDateTime(startDate)}</Text>
          </StyledInfoDetail>
          <StyledInfoLocation>
            <LocationIcon />
            <Text size={'xs'} numberOfLines={1} ellipsizeMode={'tail'}>
              {location}
            </Text>
          </StyledInfoLocation>
        </StyledInfoBody>
        <StyledBadgesContainer>
          <ExerciseTypeBadge exerciseType={exerciseType} />
          {groupName && <Text size={'xs'}>{groupName}</Text>}
        </StyledBadgesContainer>
      </StyledUpBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity<{borderColor: string}>`
  flex-direction: row;
  //min-width: 250px;
  padding: 10px 0;
  align-items: center;
  align-self: stretch;
  gap: 14px;
  border-bottom: 1px solid ${({borderColor}) => borderColor};
`;

const StyledUpBody = styled.View`
  flex: 1;
  gap: 4px;
`;

const StyledInfoHeader = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

const StyledInfoSubHeader = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 8px;
`;

const StyledHeaderTextContainer = styled.View`
  width: 60%;
`;

const StyledInfoBody = styled.View`
  flex-direction: row;
  align-self: stretch;
  gap: 10px;
`;

const StyledInfoDetail = styled.View`
  flex-direction: row;
  align-self: stretch;
  gap: 4px;
`;

const StyledInfoLocation = styled.View`
  flex-direction: row;
  align-self: stretch;
  gap: 4px;
  max-width: 30%;
`;

const StyledBadgesContainer = styled.View`
  align-self: stretch;
  flex-direction: row;
  gap: 8px;
`;
