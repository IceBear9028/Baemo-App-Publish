import {PlayerLevel} from '~/shared/mapper/userProfile';
import {Badge, BadgeText} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {Fragment} from 'react';
import {Gender} from '~/shared/mapper/userProfile/lib/gender.ts';

interface PlayerLevelBadgeProps {
  playerLevel: keyof PlayerLevel | '';
  gender: keyof Gender;
}

export const PlayerLevelBadge = ({playerLevel, gender}: PlayerLevelBadgeProps) => {
  const isExistGender = !!Gender.convertText(gender);
  if (!playerLevel) {
    return <Fragment />;
  }
  return (
    <StyledContainer>
      <Badge borderRadius="$xl" action="muted" size={'sm'}>
        {isExistGender && <BadgeText>{`${Gender.convertText(gender)} `}</BadgeText>}
        <BadgeText>{PlayerLevel.levelText(playerLevel)}</BadgeText>
      </Badge>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
`;
