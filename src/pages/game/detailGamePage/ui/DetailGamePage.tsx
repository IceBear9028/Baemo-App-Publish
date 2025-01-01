import React from 'react';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {Game} from '~/shared/mapper/exercise';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {GameScoreSection} from 'entities/exercise/gameScoreSection';
import {GameInfoSection} from '~/entities/exercise/gameInfoSection';
import {useFetchGetDetailGame} from '~/features/game/fetchDetailGame';
// import {GameScoreLogSection} from '~/entities/exercise/gameScoreLogSection';

interface DetailGamePageProps extends NativeStackScreenProps<RootMainStackParamList, 'detailGamePage'> {}
interface DetailGameBoardProps extends Pick<Game, 'gameId'> {}

export const DetailGamePage = ({route}: DetailGamePageProps) => {
  const game = route.params;
  return (
    <ApiErrorBoundary>
      <StyledContainer>
        <DetailGameBoard {...game} />
      </StyledContainer>
    </ApiErrorBoundary>
  );
};

const DetailGameBoard = (props: DetailGameBoardProps) => {
  const {isFetching, detailGame, refetch} = useFetchGetDetailGame(props.gameId);
  return (
    <>
      {detailGame && (
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <GameInfoSection {...detailGame} />
          <GameScoreSection {...detailGame} />
        </StyledScrollContainer>
      )}
    </>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding: 0 20px 0 20px;
`;

const StyledScrollContainer = styled.ScrollView``;
