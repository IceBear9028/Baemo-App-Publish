import React from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {GameCard} from '~/entities/game/gameCard';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {ExerciseUserRole, FilterGameStatus} from '~/shared/mapper/exercise';
import {useFetchGetGameList} from '~/features/game/fetchGameList';
import {useFetchStartGame} from '~/features/game/fetchStartGame';

interface DetailGameListProps {
  filterStatus?: keyof FilterGameStatus;
  isMyGame: boolean;
  exerciseId: number;
  role: ExerciseUserRole;
}

export const DetailGameList = (props: DetailGameListProps) => {
  const {startGame} = useFetchStartGame();
  const {isFetching, data, refetch} = useFetchGetGameList(props.exerciseId, props.isMyGame, props.filterStatus);

  if (isFetching) {
    return <ActivityIndicator size="small" />;
  }
  if (data && data.length <= 0) {
    return (
      <StyledFallback>
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <StyledPadding />
          <Text>게임이 없습니다.</Text>
        </StyledScrollContainer>
      </StyledFallback>
    );
  }

  return (
    <StyledContainer>
      {data && (
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <StyledCardContainer>
            {data.map((game, index) => {
              return <GameCard key={`${index}-${game.gameId}`} role={props.role} onMatchGame={() => startGame(game)} {...game} />;
            })}
          </StyledCardContainer>
          <StyledScrollPadding />
        </StyledScrollContainer>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  gap: 4px;
`;

const StyledScrollContainer = styled.ScrollView``;

const StyledCardContainer = styled.View`
  padding: 12px 20px 120px 20px;
  gap: 24px;
`;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledPadding = styled.View`
  height: 320px;
`;

const StyledScrollPadding = styled.View`
  height: 160px;
`;
