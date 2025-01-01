import {mainRoutePath} from '~/shared/route';
import {LinkingOptions} from '@react-navigation/native';

export const deepLinkConfig: LinkingOptions<any> = {
  prefixes: ['baemo://'],
  config: {
    initialRouteName: 'mainTabs',
    screens: {
      ...mainRoutePath, // 재사용 가능한 라우트 경로
      detailGroupsPage: {
        path: 'detailGroupsPage',
        parse: {
          groupsId: (id: string | number) => id.toString() || null, // null 방지
        },
      },
      detailGamePage: {
        path: 'detailGamePage',
        parse: {
          gameId: (id: string | number) => id.toString() || null, // null 방지
        },
      },
      //중복된 경로 설정은 마지막에 선언된 라우트가 우선순위를 갖는다.
      detailChattingRoomPage: {
        path: 'detailChattingRoomPage/:chatRoomId/:chatRoomName?',
        parse: {
          chatRoomId: id => id,
          chatRoomName: name => name || '',
        },
      },
    },
  },
};
