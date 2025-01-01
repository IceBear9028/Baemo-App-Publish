import {Button, ButtonText} from '@gluestack-ui/themed';
import {useFetchSpecifyTeam} from '../model/useFetchSpecifyTeam.ts';
import {Game} from '~/shared/mapper/exercise';

interface SpecifyTeamButtonProps extends Pick<Game, 'gameId'> {}

export const SpecifyTeamButton = (props: SpecifyTeamButtonProps) => {
  const {specifyTeam} = useFetchSpecifyTeam();
  return (
    <Button size={'sm'} onPress={() => specifyTeam(props.gameId)}>
      <ButtonText>게임 시작하기</ButtonText>
    </Button>
  );
};
