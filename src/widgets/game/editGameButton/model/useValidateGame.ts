import {useEffect, useState} from 'react';
import {useTeamMetaStore} from '~/features/game/teamMetaStore';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';

export function useValidateGame() {
  const isNotValidMeta = useTeamMetaStore(store => store.isNotValidMeta);
  const isNotValidTeam = useSpecifyTeamStore(store => store.isNotValidTeam);
  const [isNotValidGame, setValidGame] = useState<boolean>(false);

  useEffect(() => {
    const isValid = isNotValidMeta || isNotValidTeam;
    setValidGame(isValid);
  }, [isNotValidTeam, isNotValidMeta]);

  return {isNotValidGame};
}
