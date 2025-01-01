import 'react-native-url-polyfill/auto';
import {useEffect, useState} from 'react';
import {BaemoBaseUrl} from '~/shared/fetch';
import {useTeamMetaStore} from '~/features/game/teamMetaStore';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {useAuthStore} from '~/shared/authentication/model/authStore.ts';
import EventSource, {EventSourceListener} from 'react-native-sse';
import {DetailGame} from '~/shared/mapper/exercise';

export function useFetchGetDetailGameSSE(gameId: number) {
  const {token} = useAuthStore();
  const {loadTeamInfoStore} = useTeamMetaStore();
  const {loadPlayerStore} = useSpecifyTeamStore();
  const [data, setData] = useState<DetailGame>();

  // SSE 연결
  // Detail Game 정보 받으면 store 에 업데이트
  useEffect(() => {
    /** 1. 헤더 & http 셋팅
     */
    const urls = new URL(BaemoBaseUrl + `api/match/connect/${gameId}/scoreboard`);
    const customHeader = {
      method: 'GET',
      headers: {
        Connection: 'keep-alive',
        Authorization: token?.authorization,
      },
      debug: true,
    };

    /** 2. EventSource 호출 및 인스턴스 생성
     */
    const eventSource = new EventSource(urls, customHeader);

    const listener: EventSourceListener = event => {
      console.log('eee', event);
      if (event.type === 'open') {
        console.log('연결로그-->', event);
      } else if (event.type === 'message') {
        console.log('메시지-->', event.data);
        const detailGame = JSON.parse(event.data || '{}') as DetailGame;
        if (!Object.keys(detailGame).length) {
          loadPlayerStore(detailGame);
          loadTeamInfoStore(detailGame);
          setData(() => detailGame);
        }
      } else if (event.type === 'error') {
        console.error('Connection error:', event);
      } else if (event.type === 'exception') {
        console.error('Error:', event.message, event.error);
      }
    };

    eventSource.addEventListener('message', listener);
    eventSource.addEventListener('open', listener);
    eventSource.addEventListener('error', listener);

    if (data) {
      loadPlayerStore(data);
      loadTeamInfoStore(data);
    }

    return () => {
      eventSource.removeAllEventListeners();
      eventSource.close();
    };
  }, []);

  return {detailGame: data};
}
