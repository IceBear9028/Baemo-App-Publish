import {useEffect, useState} from 'react';

export function useIsLikeStatus(initLikeStatus: boolean = false) {
  const [isLike, setLike] = useState<boolean>(initLikeStatus);

  function setLikeStatus() {
    setLike(prev => !prev);
  }

  useEffect(() => {
    setLike(() => initLikeStatus);
  }, [initLikeStatus]);

  return {
    isLike,
    setLikeStatus,
  };
}
