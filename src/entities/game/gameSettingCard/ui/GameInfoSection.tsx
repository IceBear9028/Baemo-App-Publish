import {Game} from '~/shared/mapper/exercise';
import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';

interface GameInfoSectionProps extends Pick<Game, 'gameOrder' | 'courtNumber' | 'gameType' | 'gameStatus'> {}

export const GameInfoSection = ({gameOrder, gameType}: GameInfoSectionProps) => {
  return (
    <StyledContainer>
      {gameType === 0 && (
        <Text color={'$textLight800'} size={'xs'} numberOfLines={1} ellipsizeMode={'tail'}>
          팀 미지정
        </Text>
      )}
      <StyledTextContainer>
        <Text bold={true} color={'$textLight950'} size={'xs'} numberOfLines={1} ellipsizeMode={'tail'}>
          {`${gameOrder} 번 게임`}
        </Text>
      </StyledTextContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  display: flex;
  min-height: 50px;
  width: 72px;
  padding: 4px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #f6f6f6;
`;

const StyledTextContainer = styled.View`
  align-items: center;
`;
