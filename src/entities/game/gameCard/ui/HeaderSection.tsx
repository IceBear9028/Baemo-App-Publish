import styled from 'styled-components/native';
import ArrowIcon from '~/shared/images/svg/game_arrow.svg';
import {Text} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';
import {ExerciseUserRole, Game} from '~/shared/mapper/exercise';
import {GameStatusBadge} from '~/shared/ui';

interface HeaderSectionProps extends Pick<Game, 'courtNumber' | 'gameOrder' | 'gameId' | 'exerciseId' | 'gameStatus'> {
  onDetailGame: () => void;
  onEditGame: () => void;
  role: ExerciseUserRole;
}

export const HeaderSection = ({
  courtNumber,
  gameOrder,
  gameId,
  onDetailGame,
  onEditGame,
  role,
  exerciseId,
  gameStatus,
}: HeaderSectionProps) => {
  const textColor = useToken('colors', 'textLight900');
  return (
    <StyledContainer>
      <StyledInfoContainer onPress={onDetailGame}>
        <GameStatusBadge status={gameStatus} />
        <StyledGameTitleSection>
          <Text color={'$textLight900'} bold={true}>{`${gameOrder} 번 게임`}</Text>
          {/*<ArrowIcon style={{color: textColor}} />*/}
        </StyledGameTitleSection>
      </StyledInfoContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  justify-content: space-between;
`;

const StyledInfoContainer = styled.Pressable`
  flex-direction: row;
  gap: 8px;
`;

const StyledGameTitleSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
