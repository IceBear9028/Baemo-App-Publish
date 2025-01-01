import React from 'react';
import {Game, GameStatus} from '~/shared/mapper/exercise';
import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import {GameSettingCard} from '~/entities/game/gameSettingCard';
import {Platform} from 'react-native';
import {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';

type GameStyleKey = {
  [index in keyof Partial<GameStatus>]: {
    color: ColorValue;
    text: string;
  };
};

interface StatusGameSectionProps {
  gameList: Game[];
  gameStatus: Game['gameStatus'];
  openBottomSheet: () => void;
}

export const StatusGameSection = ({gameStatus, gameList, openBottomSheet}: StatusGameSectionProps) => {
  const styleKey: GameStyleKey = {
    '0': {
      color: '$purple500',
      text: '대기중',
    },
    '1': {
      color: '$blue500',
      text: '다음',
    },
    '4': {
      color: '$trueGray700',
      text: '완료',
    },
    '5': {
      color: '$trueGray700',
      text: '완료',
    },
  };
  return (
    <StyledGameSection>
      <StyledHeader>
        <StyledHeaderText>
          <Text size={'lg'} bold color={styleKey[gameStatus]?.color as any}>
            {styleKey[gameStatus]?.text}
          </Text>
          <Text size={'lg'} bold color={'$textLight900'}>
            인 게임
          </Text>
        </StyledHeaderText>
      </StyledHeader>
      {gameList && gameList.length <= 0 ? (
        <StyledFallbackContainer>
          <Text color={'$textLight900'}>진행 중인 게임이 없습니다.</Text>
          <Text size={'xs'}>게임을 새로 만들어주세요.</Text>
        </StyledFallbackContainer>
      ) : (
        <StyledGameList>
          {gameList.map((game, index) => (
            <GameSettingCard openBottomSheet={openBottomSheet} key={`${index}-${game.gameId}`} {...game} />
          ))}
        </StyledGameList>
      )}
    </StyledGameSection>
  );
};

const StyledFallbackContainer = styled.View`
  padding: 32px 0 32px 0;
  justify-content: center;
  gap: 6px;
  align-items: center;
`;

const StyledGameSection = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 12px 14px;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0 2px;
      shadow-opacity: 0.1;
      shadow-radius: 4px;
    `,
    android: `
      elevation: 4;
    `,
  })}
`;

const StyledHeader = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 2px;
`;

const StyledHeaderText = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 1px;
`;

const StyledGameList = styled.View`
  gap: 12px;
`;

const StyledHorizonDivider = styled.View<{$background?: string}>`
  flex: 1;
  height: 1px;
  background: ${({$background}) => ($background ? $background : '#dfdfdf')};
`;
