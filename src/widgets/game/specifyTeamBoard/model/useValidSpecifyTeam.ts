import {useEffect, useState} from 'react';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';

export function useValidSpecifyTeam() {
  const {teams, setValidTeam} = useSpecifyTeamStore();
  const [teamError, setTeamError] = useState<string>('');
  const isError = teamError.length !== 0;

  useEffect(() => {
    const selectPlayerCount = teams.players.length;
    const aTeamPlayerCount = teams.aTeamPlayers.length;
    const bTeamPlayerCount = teams.bTeamPlayers.length;
    const allPlayerCount = aTeamPlayerCount + bTeamPlayerCount + selectPlayerCount;

    if (teams.isSpecifyTeam) {
      const isEmptyPlayer = allPlayerCount === 0;
      const isTeamShort = allPlayerCount < 4;
      const isSpecifyTeamYet = selectPlayerCount !== 0;
      const isDifferentTeamCount = aTeamPlayerCount !== bTeamPlayerCount;
      if (isEmptyPlayer) {
        setTeamError('인원를 등록해주세요.');
        return;
      }
      if (isTeamShort) {
        setTeamError('팀원은 4명으로 구성되어야 합니다.');
        return;
      }
      if (isSpecifyTeamYet) {
        setTeamError('인원를 팀에 지정해주세요.');
        return;
      }
      if (isDifferentTeamCount) {
        setTeamError('팀의 인원을 같게 해주세요.');
        return;
      }
      setTeamError('');
    } else {
      const isEmptyPlayer = selectPlayerCount === 0;
      const isTeamShort = allPlayerCount < 4;

      if (isEmptyPlayer) {
        setTeamError('인원를 등록해주세요.');
        return;
      }
      if (isTeamShort) {
        setTeamError('인원는 4명으로 구성되어야 합니다.');
        return;
      }
      setTeamError('');
    }
  }, [teams]);

  useEffect(() => {
    const isError = teamError.length !== 0;
    if (isError) {
      setValidTeam(true);
    } else {
      setValidTeam(false);
    }
  }, [teamError]);

  return {teamError, isError};
}

/** 팀원이 2명, 4명 지정이 허용된 경우에 대한 유효성검증
 */
export function useValidSpecifyTeam_BEFORE() {
  const {teams, setValidTeam} = useSpecifyTeamStore();
  const [teamError, setTeamError] = useState<string>('');
  const isError = teamError.length !== 0;

  useEffect(() => {
    const selectPlayerCount = teams.players.length;
    const aTeamPlayerCount = teams.aTeamPlayers.length;
    const bTeamPlayerCount = teams.bTeamPlayers.length;

    if (teams.isSpecifyTeam) {
      const allPlayerCount = aTeamPlayerCount + bTeamPlayerCount + selectPlayerCount;
      const isEmptyPlayer = allPlayerCount === 0;
      const isOddCount = allPlayerCount % 2 === 1;
      const isSpecifyTeamYet = selectPlayerCount !== 0;
      const isDifferentTeamCount = aTeamPlayerCount !== bTeamPlayerCount;
      if (isEmptyPlayer) {
        setTeamError('인원를 등록해주세요.');
        return;
      }
      if (isOddCount) {
        setTeamError('팀원은 2명, 4명으로 구성되어야 합니다.');
        return;
      }
      if (isSpecifyTeamYet) {
        setTeamError('인원를 팀에 지정해주세요.');
        return;
      }
      if (isDifferentTeamCount) {
        setTeamError('팀의 인원을 같게 해주세요.');
        return;
      }
      setTeamError('');
    } else {
      const isEmptyPlayer = selectPlayerCount === 0;
      const isOddCount = selectPlayerCount % 2 === 1;

      if (isEmptyPlayer) {
        setTeamError('인원를 등록해주세요.');
        return;
      }
      if (isOddCount) {
        setTeamError('인원는 4명으로 구성되어야 합니다.');
        return;
      }
      setTeamError('');
    }
  }, [teams]);

  useEffect(() => {
    const isError = teamError.length !== 0;
    if (isError) {
      setValidTeam(true);
    } else {
      setValidTeam(false);
    }
  }, [teamError]);

  return {teamError, isError};
}
