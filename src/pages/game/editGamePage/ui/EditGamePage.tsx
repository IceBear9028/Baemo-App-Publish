import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {RootMainStackParamList} from '~/shared/route';
import {useTeamMetaStore} from '~/features/game/teamMetaStore';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {SpecifyTeamBoard} from '~/widgets/game/specifyTeamBoard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type EditGamePageProps = {} & NativeStackScreenProps<RootMainStackParamList, 'editGamePage'>;

export const EditGamePage = ({route}: EditGamePageProps) => {
  const game = route.params;
  const {loadTeamInfoStore} = useTeamMetaStore();
  const {loadPlayerStore} = useSpecifyTeamStore();

  // 페이지 로드 시 game 관련 store 에 상태 업데이트
  useEffect(() => {
    loadPlayerStore(game);
    loadTeamInfoStore(game);
  }, [game]);

  return (
    <StyledScrollContainer>
      <SpecifyTeamBoard />
    </StyledScrollContainer>
  );
};

const StyledScrollContainer = styled.ScrollView`
  flex: 1;
`;
