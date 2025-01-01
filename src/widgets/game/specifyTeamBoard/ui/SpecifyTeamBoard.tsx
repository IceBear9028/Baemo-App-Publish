import styled from 'styled-components/native';
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, Text} from '@gluestack-ui/themed';
import {ApplyPlayerCard} from '~/entities/game/applyPlayerCard';
import {SelectPlayerBottomSheet} from '~/features/game/selectPlayerBottomSheet';
import {TeamControl} from '~/widgets/game/specifyTeamBoard/ui/TeamControl.tsx';
import {useValidSpecifyTeam} from '../model/useValidSpecifyTeam.ts';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

export const SpecifyTeamBoard = () => {
  const {exerciseId} = useExerciseRoleStore();
  const {teams, addPlayers, addTeamPlayers, deletePlayers, checkSpecifyGame} = useSpecifyTeamStore();
  const {aTeamPlayers, bTeamPlayers, players, isSpecifyTeam} = teams;
  const {isError, teamError} = useValidSpecifyTeam();

  return (
    <StyledContainer>
      {isError && (
        <StyledErrorContainer>
          <Text color={'$error400'} lineHeight="$xs" size={'sm'}>
            {teamError}
          </Text>
        </StyledErrorContainer>
      )}
      <StyledSubContainer>
        <Checkbox
          size="md"
          aria-label={'팀 지정게임 여부'}
          value={'팀 지정'}
          isChecked={isSpecifyTeam}
          onChange={value => checkSpecifyGame(value)}>
          <CheckboxIndicator mr="$2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>팀 지정하기</CheckboxLabel>
        </Checkbox>
      </StyledSubContainer>
      {isSpecifyTeam && <TeamControl />}
      <StyledSubContainer>
        <Text color="$textLight800" lineHeight="$xs">
          인원 지정하기
        </Text>
        <StyledPlayerContainer>
          {players.map((player, index) => (
            <ApplyPlayerCard
              key={`${index}-${player.userId}`}
              user={player}
              isSpecifyTeam={isSpecifyTeam}
              onDelete={deletePlayers}
              addTeamA={() => addTeamPlayers('a', player)}
              addTeamB={() => addTeamPlayers('b', player)}
            />
          ))}
        </StyledPlayerContainer>
      </StyledSubContainer>
      <SelectPlayerBottomSheet
        onSelect={addPlayers}
        exerciseId={exerciseId}
        selectPlayers={[...players, ...aTeamPlayers, ...bTeamPlayers]}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 0 20px;
  gap: 24px;
`;

const StyledSubContainer = styled.View`
  gap: 6px;
`;

const StyledPlayerContainer = styled.View`
  gap: 16px;
`;

const StyledErrorContainer = styled.View`
  background: #ffefefff;
  justify-content: center;
  align-items: center;
  padding: 20px 0 20px 0;
  border-radius: 5px;
`;
