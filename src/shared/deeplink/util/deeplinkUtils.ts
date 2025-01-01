import {Linking} from 'react-native';
import {APP_SCHEME} from '~/shared/deeplink/util/deeplink-constants.ts';
import {KakaoApiKey} from '~/shared/fetch';

/** domain 종류 - 전부 id 필드 가지고 있음.
 * DETAIL_GAME
 * - 게임 상세 페이지
 *
 * DETAIL_EXERCISE
 * - 운동 상세 페이지
 *
 * DETAIL_CLUB
 * - 모임 상세 페이지
 *
 * DETAIL_CLUB_POST
 * - 모임 게시글 상세 페이지
 *
 * DETAIL_CHAT
 * - 채팅방 상세 페이지(채팅방 입장)
 */
export function deeplinkUrlConverter(domain: string, headerTitle?: string, id?: number): string {
  let page = '';
  let paramList: string[] = [];

  switch (domain) {
    case 'DETAIL_GAME':
      page = 'detailGamePage';
      paramList = ['gameId'];
      break;
    case 'DETAIL_EXERCISE':
      page = 'detailExercisePage';
      paramList = ['exerciseId'];
      break;
    case 'DETAIL_CLUB':
      page = 'detailGroupsPage';
      paramList = ['groupsId'];
      break;
    // api 수정될때까지 임시 비활성화
    // case 'DETAIL_CLUB_POST':
    //   page = 'detailGroupArticlePage';
    //   paramList = ['groupsId'];
    //   break;
    case 'DETAIL_CHAT':
      page = 'detailChattingRoomPage';
      paramList = ['chatRoomId', 'chatRoomName'];
      break;
    default:
      console.log(`DEEP-LINK ERROR ::: Deeplink domain 정의가 형식에 어긋납니다. domain: ${domain}`);
      break;
  }

  let result: string;
  if (id) {
    let paramUrl;
    switch (paramList.length) {
      case 0:
        break;
      case 1:
        paramUrl = `${paramList[0]}=${id}`;
        break;
      case 2:
        paramUrl = `${paramList[0]}=${id}&${paramList[1]}=${headerTitle}`;
        break;
    }

    result = `${page}?${paramUrl}`;
  } else {
    result = `${page}`;
  }

  result = `${APP_SCHEME}${result}`;
  console.log(`Converted deep link url ::: ${result}`);
  return result;
}

const parseKakaoShareQueryParams = (url: string): {key: string; value: string} | null => {
  const queryString = url.split('?')[1];
  if (!queryString) {
    return null;
  }

  const params = queryString.split('&').reduce((acc, param) => {
    const [key, value] = param.split('=');
    acc[key] = decodeURIComponent(value || '');
    return acc;
  }, {} as Record<string, string>);

  // `pageName`을 key, 나머지 쿼리를 value로 반환
  const key = params.pageName || '';
  const {pageName, ...rest} = params;
  const value = Object.entries(rest)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  // console.log(`KAKAO Parsed Params: {${key}: ${value}}`);

  return {key, value};
};

export class DeeplinkManager {
  public lastHandledUrl: string | null = null;

  handleDeeplink = (url: string, source: string) => {
    if (!url || typeof url !== 'string') {
      console.error(`[${source}] Invalid URL type:`, url);
      return;
    }

    if (this.lastHandledUrl === url) {
      console.log(`[${source}] Duplicate URL ignored: ${url}`);
      return;
    }

    if (url.startsWith(`kakao${KakaoApiKey}://kakaolink`)) {
      const params = parseKakaoShareQueryParams(url);
      url = `baemo://${params?.key}?${params?.value}`;
      console.log(`KAKAO SHARE DEEPLINK URL: ${url}`);
    }

    this.lastHandledUrl = url;

    try {
      console.log(`[${source}] Handling deep link: ${url}`);
      setTimeout(() => Linking.openURL(url), 1000);
    } catch (error) {
      console.error(`[${source}] Error handling deep link:`, error);
    }
  };
}
