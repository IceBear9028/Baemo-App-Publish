import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import {useHorizonOrientationLock} from '~/shared/utils';
import {TeamScorePanel} from '~/widgets/game/teamScorePanel';
import {GameSettingPanel} from '~/widgets/game/gameSettingPanel';
import {SafeAreaView} from '@gluestack-ui/themed';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {useFetchGetDetailGameTemp} from '../model/useFetchGetDetailGameTemp.ts';

interface MatchGamePageProps extends NativeStackScreenProps<RootMainStackParamList, 'matchGamePage'> {}

interface ScoreBoardProps {
  gameId: number;
}

export const MatchGamePage = ({route}: MatchGamePageProps) => {
  useHorizonOrientationLock();
  return (
    <Fragment>
      <SafeAreaView style={{flex: 0}} />
      <SafeAreaView style={{flex: 1}}>
        <ApiErrorBoundary>
          <ScoreBoard gameId={route.params.gameId} />
        </ApiErrorBoundary>
      </SafeAreaView>
    </Fragment>
  );
};

const ScoreBoard = ({gameId}: ScoreBoardProps) => {
  const {isFetching, detailGame} = useFetchGetDetailGameTemp(gameId);
  return (
    <Fragment>
      <StyledContainer>
        {detailGame && <TeamScorePanel {...detailGame} />}
        {detailGame && <GameSettingPanel isFetching={isFetching} {...detailGame} />}
      </StyledContainer>
    </Fragment>
  );
};

const StyledContainer = styled.View`
  position: relative;
  padding-top: 16px;
  flex: 1;
`;
