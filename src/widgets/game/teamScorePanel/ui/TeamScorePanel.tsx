import styled from 'styled-components/native';
import {Heading} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';
import {Game} from '~/shared/mapper/exercise';
import {ATeamScorePanel, BTeamScorePanel} from '../ui/ScorePanel.tsx';
import {ATeamPlayerList, BTeamPlayerList} from '../ui/PlayerList.tsx';
import {useFetchEditScoreBoard} from '~/features/game/fetchEditScoreBoard';

interface TeamScorePanelProps extends Pick<Game, 'gameId' | 'gameType' | 'teamA' | 'teamB'> {}

export const TeamScorePanel = ({gameId, gameType, teamA, teamB}: TeamScorePanelProps) => {
  const aTeamBackground = useToken('colors', 'rose50');
  const bTeamBackground = useToken('colors', 'lightBlue100');

  const {actionTeamA, actionTeamB} = useFetchEditScoreBoard();

  /** 조건부 기준
   * - 팀 지정게임(gameType = 1) 인 경우 바로 게임 시작
   * - 팀 미지정게임(gameType = 0) 인 경우 점수를 표시하지 않음
   */
  return (
    <StyledContainer>
      <StyledPanelContainer $background={aTeamBackground}>
        <StyledHeader direction={'left'}>
          <Heading size={'2xl'} color={'$rose700'}>
            Team A
          </Heading>
        </StyledHeader>
        <ATeamPlayerList gameType={gameType} />
        {gameType === 1 && <ATeamScorePanel value={teamA.score} upScore={() => actionTeamA(gameId)} />}
      </StyledPanelContainer>
      <StyledPanelContainer $background={bTeamBackground}>
        <StyledHeader direction={'right'}>
          <Heading size={'2xl'} color={'$lightBlue700'}>
            Team B
          </Heading>
        </StyledHeader>
        <BTeamPlayerList gameType={gameType} />
        {gameType === 1 && <BTeamScorePanel value={teamB.score} upScore={() => actionTeamB(gameId)} />}
      </StyledPanelContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: row;
  border-radius: 16px;
  overflow: hidden;
`;

const StyledPanelContainer = styled.View<{$background: string}>`
  width: 50%;
  padding: 24px 20px 0 20px;
  ${({$background}) => ($background ? `background : ${$background}` : '')};
`;

const StyledHeader = styled.View<{direction: 'left' | 'right'}>`
  align-items: ${({direction}) => (direction === 'left' ? 'flex-start' : 'flex-end')};
`;
