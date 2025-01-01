import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';

export function useValidateGame() {
  const isNotValidTeam = useSpecifyTeamStore(store => store.isNotValidTeam);
  return {isNotValidGame: isNotValidTeam};
}
