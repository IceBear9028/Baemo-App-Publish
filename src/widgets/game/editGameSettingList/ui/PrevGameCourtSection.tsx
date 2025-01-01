import React, {Fragment} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {Game} from '~/shared/mapper/exercise';
import {Text, useToken} from '@gluestack-ui/themed';
import {GameSettingCard} from '~/entities/game/gameSettingCard';
import {useFetchGetGameCourtList} from '~/features/game/fetchCourtList';
import {SelectGameCourtBottomSheetProps} from '~/widgets/game/selectGameCourtBottomSheet';
import {GameCourtBottomSheet} from '~/widgets/game/gameCourtBottomSheet';

interface PrevGameCourtSectionProps extends SelectGameCourtBottomSheetProps {
  gameList: Game[];
  openBottomSheet: () => void;
}

export const PrevGameCourtSection = ({gameList, closeBottomSheet, openBottomSheet}: PrevGameCourtSectionProps) => {
  const {courtList} = useFetchGetGameCourtList();
  const courtColor = useToken('colors', 'primary500');
  if (!courtList) {
    return (
      <StyledFallbackContainer>
        <Text>문제가 발생했습니다.</Text>
      </StyledFallbackContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledHeaderText>
          <Text size={'lg'} bold color={'$primary500'}>
            진행중
          </Text>
          <Text size={'lg'} bold color={'$textLight900'}>
            인 게임
          </Text>
        </StyledHeaderText>
        <GameCourtBottomSheet />
      </StyledHeader>
      {courtList.length <= 0 ? (
        <StyledFallbackContainer>
          <StyledTextContainer>
            <Text color={'$textLight900'}>코트가 없습니다.</Text>
            <Text size={'xs'}>'코트 관리' 버튼을 터치해주세요.</Text>
          </StyledTextContainer>
        </StyledFallbackContainer>
      ) : (
        <StyledCourtList>
          {courtList.map((court, id) => {
            const courtGameList = gameList.filter(game => game.courtNumber === court.courtNumber);
            return (
              <StyledCourtContainer key={`${id}-${court.courtNumber}`}>
                <StyledCourtNumberHeader>
                  <StyledCourtLine />
                  <StyledCourtNumber background={courtColor}>
                    <Text color={'$textLight0'} size={'sm'} bold>{`${court.courtNumber} 번 코트`}</Text>
                  </StyledCourtNumber>
                  <StyledCourtLine />
                </StyledCourtNumberHeader>
                {courtGameList.length ? (
                  <Fragment>
                    {courtGameList.map((game, id) => (
                      <GameSettingCard key={`${id}-${game.courtNumber}`} openBottomSheet={openBottomSheet} {...game} />
                    ))}
                  </Fragment>
                ) : (
                  <StyledFallbackContainer>
                    <Text color={'$textLight900'}>진행 중인 게임이 없습니다.</Text>
                  </StyledFallbackContainer>
                )}
              </StyledCourtContainer>
            );
          })}
        </StyledCourtList>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
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

const StyledFallbackContainer = styled.View`
  padding: 28px 0 28px 0;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  //border-width: 1px;
  //border-color: #ededed;
`;

const StyledCourtList = styled.View`
  gap: 12px;
`;

const StyledCourtContainer = styled.View`
  justify-content: flex-start;
  gap: 8px;
`;

const StyledCourtNumberHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const StyledCourtNumber = styled.View<{background: string}>`
  ${({background}) => `background : ${background};`}
  padding : 2px 6px;
  border-radius: 6px;
`;

const StyledCourtLine = styled.View`
  flex-grow: 1; /* 부모 컨테이너에서 가능한 모든 공간을 차지 */
  height: 1.5px;
  background-color: #ededed;
`;

const StyledTextContainer = styled.View`
  gap: 6px;
  justify-content: center;
  align-items: center;
`;
