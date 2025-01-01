import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import GameCourtIcon from '~/shared/images/svg/game_court.svg';
import GameRefereeIcon from '~/shared/images/svg/game_referee.svg';
import {Badge, BadgeText, Text} from '@gluestack-ui/themed';
import {DetailGame} from '~/shared/mapper/exercise';

interface GameInfoSectionProps extends Pick<DetailGame, 'referee' | 'courtNumber'> {}

export const GameInfoSection = ({referee, courtNumber}: GameInfoSectionProps) => {
  const borderColor = useToken('colors', 'trueGray200');
  return (
    <StyledContainer borderColor={borderColor}>
      <StyledHeader>
        <Text bold>게임정보</Text>
      </StyledHeader>
      <StyledBody>
        <StyledInfoItem>
          <StyledInfoTitle>
            <GameRefereeIcon />
            <Text size={'sm'}>심판</Text>
          </StyledInfoTitle>
          {referee.userName ? (
            <Badge size={'lg'}>
              <BadgeText>{referee.userName}</BadgeText>
            </Badge>
          ) : (
            <Badge size={'lg'}>
              <BadgeText>지정된 심판이 없습니다.</BadgeText>
            </Badge>
          )}
        </StyledInfoItem>
        <StyledInfoItem>
          <StyledInfoTitle>
            <GameCourtIcon />
            <Text size={'sm'}>코트</Text>
          </StyledInfoTitle>
          <Badge size={'lg'}>
            <BadgeText>{`${courtNumber}번 코트`}</BadgeText>
          </Badge>
        </StyledInfoItem>
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{borderColor: string}>`
  gap: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-color: ${({borderColor}) => borderColor};
`;

const StyledHeader = styled.View`
  padding-bottom: 4px;
  padding-top: 4px;
`;

const StyledBody = styled.View`
  gap: 8px;
`;

const StyledInfoItem = styled.View`
  flex-direction: row;
  gap: 16px;
`;

const StyledInfoTitle = styled.View`
  flex-direction: row;
  gap: 4px;
`;
