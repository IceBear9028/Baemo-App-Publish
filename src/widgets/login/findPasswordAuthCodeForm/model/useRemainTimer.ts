import {useEffect, useState} from 'react';

const initTimeLimit = 300; // 5분

export function useRemainTimer() {
  const [remainTime, setRemainTime] = useState<number>(initTimeLimit);

  function resetTimer() {
    setRemainTime(() => initTimeLimit);
  }

  useEffect(() => {
    let timer: any = 0;
    if (remainTime > 0) {
      timer = setInterval(() => {
        setRemainTime(prev => prev - 1);
      }, 1000);
    }

    if (remainTime === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [remainTime]);

  return {
    remainTime,
    resetTimer,
  };
}
