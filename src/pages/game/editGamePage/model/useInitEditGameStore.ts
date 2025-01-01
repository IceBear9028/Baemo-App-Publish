import {Game} from '~/shared/mapper/exercise';
import {useTeamMetaStore} from '~/features/game/teamMetaStore';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';

export function useInitEditGameStore(input: Game) {
  const {loadPlayerStore} = useSpecifyTeamStore();
  const {loadTeamInfoStore} = useTeamMetaStore();
}
