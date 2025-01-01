import React from 'react';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {Heading, Text} from '@gluestack-ui/themed';
import {ExerciseMyRule} from '~/shared/mapper/exercise';
import {GameCard} from '~/entities/game/gameCard';
import {useFetchGetPresentGameList} from '../model/useFetchGetPresentGameList.ts';

interface PresentDetailGameListProps {
  exerciseId: number;
  exerciseRole: keyof ExerciseMyRule;
}

export const PresentDetailGameList = (props: PresentDetailGameListProps) => {
  const {data} = useFetchGetPresentGameList(props.exerciseId);
  const {navigateMatchGame} = useMainNavigate();

  if (data && data.length <= 0) {
    return (
      <StyledFallback>
        <StyledHeaderContainer>
          <Heading size={'md'} color={'$textLight950'}>
            진행 중인 게임
          </Heading>
        </StyledHeaderContainer>
        <StyledPadding />
        <Text>진행 중인 게임이 없습니다.</Text>
      </StyledFallback>
    );
  }
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Heading size={'md'} color={'$textLight950'}>
          진행 중인 게임
        </Heading>
      </StyledHeaderContainer>
      {data && (
        <StyledScrollContainer>
          <StyledCardContainer>
            {data.map((game, index) => (
              <GameCard
                key={`${index}-${game.gameId}`}
                role={props.exerciseRole}
                onMatchGame={() => navigateMatchGame(game.gameId)}
                {...game}
              />
            ))}
          </StyledCardContainer>
        </StyledScrollContainer>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  gap: 4px;
  padding: 18px 0 60px 0;
`;

const StyledScrollContainer = styled.ScrollView``;

const StyledCardContainer = styled.View`
  padding: 0 20px 16px 20px;
  gap: 24px;
`;

const StyledFallback = styled.View`
  flex: 1;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledPadding = styled.View`
  height: 160px;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;
