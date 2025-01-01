import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {Text} from '@gluestack-ui/themed';

interface TeamNameProps {
  teamType: 'a' | 'b';
  name?: string;
}

interface TeamTitleProps {
  teamAName?: string;
  teamBName?: string;
}

const TeamName = ({teamType, name}: TeamNameProps) => {
  const aColor = useToken('colors', 'rose600');
  const bColor = useToken('colors', 'darkBlue500');
  const resultColor = teamType === 'a' ? aColor : bColor;
  const resultName = name ? name : teamType === 'a' ? 'A 팀' : 'B 팀';
  return (
    <StyledTeamNameContainer color={resultColor}>
      <Text style={{color: resultColor}} bold={true}>
        {resultName}
      </Text>
    </StyledTeamNameContainer>
  );
};

export const TeamTitle = ({teamBName, teamAName}: TeamTitleProps) => {
  return (
    <StyledContainer>
      <TeamName teamType={'a'} name={teamAName} />
      <TeamName teamType={'b'} name={teamBName} />
    </StyledContainer>
  );
};

const StyledTeamNameContainer = styled.View<{color: string}>`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;

const StyledContainer = styled.View`
  flex-direction: row;
`;
