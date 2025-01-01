import {useEffect, useState} from 'react';
import {useTeamMetaStore} from '~/features/game/teamMetaStore';

export function useValidGameMeta() {
  const {meta, setValidMeta} = useTeamMetaStore();
  const [courtError, setCourtError] = useState<string>('');

  useEffect(() => {
    const courtNumber = meta.courtNumber;
    const isNotNumber = Number.isNaN(Number(courtNumber));
    const isValidCourtRange = Number(courtNumber ? courtNumber : 0) === 0;

    if (isNotNumber) {
      setCourtError('숫자를 입력해주세요.');
      return;
    }
    if (isValidCourtRange) {
      setCourtError('최소 0 이상을 입력해주세요.');
      return;
    }
    setCourtError('');
  }, [meta]);

  useEffect(() => {
    const isError = courtError.length !== 0;
    if (isError) {
      setValidMeta(true);
    } else {
      setValidMeta(false);
    }
  }, [courtError]);

  return {courtError};
}
