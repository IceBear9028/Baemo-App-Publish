import {Fragment} from 'react';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {GameStatus, GameType} from '~/shared/mapper/exercise';

interface ScoreSectionProps {
  teamAScore: number;
  teamBScore: number;
  status: keyof GameStatus;
  type: keyof GameType;
  courtNumber: number;
}

const ScoreBoard = ({teamAScore, teamBScore, status, courtNumber}: Omit<ScoreSectionProps, 'type'>) => {
  // 1. 게임 시작 전
  if (status === 0 || status === 1) {
    return (
      <BodyContainer>
        <Text size={'md'} bold color={'$textLight950'}>
          대기중
        </Text>
      </BodyContainer>
    );
  }
  if (status === 3) {
    return (
      <BodyContainer>
        <Text size={'md'} bold color={'$textLight950'}>
          점수 기록중...
        </Text>
      </BodyContainer>
    );
  }
  return (
    <BodyContainer>
      {courtNumber && <Text bold size={'sm'} color={'textLight950'}>{`${courtNumber} 번 코트`}</Text>}
      <StyledScoreContents>
        <Score>
          <Text size={'lg'} color={'$textLight600'}>
            {teamAScore}
          </Text>
        </Score>
        <DividerContainer>
          <DividerPoint />
          <DividerPoint />
        </DividerContainer>
        <Score>
          <Text size={'lg'} color={'$textLight600'}>
            {teamBScore}
          </Text>
        </Score>
      </StyledScoreContents>
    </BodyContainer>
  );
};

export const ScoreSection = ({teamAScore, teamBScore, courtNumber, status, type}: ScoreSectionProps) => {
  const score = {teamAScore, teamBScore, status, courtNumber};
  return (
    <StyledContainer>
      <ScoreSectionContainer>
        {type === 1 ? (
          <ScoreBoard {...score} />
        ) : (
          <ScoreContainer>
            {courtNumber && <Text bold size={'sm'} color={'textLight950'}>{`${courtNumber} 번 코트`}</Text>}
            <Text size={'md'} color={'$textLight950'}>
              팀 미지정
            </Text>
          </ScoreContainer>
        )}
      </ScoreSectionContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  width: 170px;
  gap: 8px;
`;

const ScoreSectionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const BodyContainer = styled.View`
  align-items: center;
`;

const ScoreContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const Score = styled.View`
  width: 36px;
  align-items: center;
  justify-content: center;
`;

const StyledScoreContents = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DividerContainer = styled.View`
  gap: 4px;
`;

const DividerPoint = styled.View`
  width: 2px;
  height: 2px;
  border-radius: 5px;
  background: #000000;
`;
