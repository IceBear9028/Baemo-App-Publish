import React from 'react';
import styled from 'styled-components/native';
import {Game} from '~/shared/mapper/exercise';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {GameScoreSection} from 'entities/exercise/gameScoreSection';
import {GameInfoSection} from '~/entities/exercise/gameInfoSection';
import {useFetchGetDetailGameSSE} from '~/features/game/fetchDetailGame';
// import {GameScoreLogSection} from '~/entities/exercise/gameScoreLogSection';

interface DetailGameSSEPageProps extends NativeStackScreenProps<RootMainStackParamList, 'detailGameSSEPage'> {}
interface DetailGameSSEBoardProps extends Pick<Game, 'gameId'> {}

export const DetailGameSSEPage = ({route}: DetailGameSSEPageProps) => {
  const game = route.params;
  return (
    <ApiErrorBoundary>
      <StyledContainer>
        <DetailGameBoard {...game} />
      </StyledContainer>
    </ApiErrorBoundary>
  );
};

const DetailGameBoard = (props: DetailGameSSEBoardProps) => {
  const {detailGame} = useFetchGetDetailGameSSE(props.gameId);
  return (
    <>
      {detailGame && (
        <StyledScrollContainer>
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
