import React from 'react';
import BottomHomeSvg from '~/shared/images/svg/bottomHome.svg';
import BottomHomeFocusSvg from '~/shared/images/svg/bottomHomeFocus.svg';
import BottomExerciseSvg from '~/shared/images/svg/bottomExercise.svg';
import BottomExerciseFocusSvg from '~/shared/images/svg/bottomExerciseFocus.svg';
import BottomChatSvg from '~/shared/images/svg/bottomChat.svg';
import BottomChatFocusSvg from '~/shared/images/svg/bottomChatFocus.svg';
import BottomCommSvg from '~/shared/images/svg/bottomComm.svg';
import BottomCommFocusSvg from '~/shared/images/svg/bottomCommFocus.svg';
import BottomProfileSvg from '~/shared/images/svg/bottomProfile.svg';
import BottomProfileFocusSvg from '~/shared/images/svg/bottomProfileFocus.svg';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {RouteProp} from '@react-navigation/native';
import {RootMainStackParamList} from '~/shared/route';
import {BackButton, HeadingTitle} from '~/shared/ui';
import {HeaderButtonGroup} from '~/app/navigation/main/ui/HeaderButtonGroup.tsx';
import {ProfileHeaderButtonGroup} from '~/app/navigation/main/ui/ProfileHeaderButtonGroup.tsx';
import {CommunityArticleBackButton, CommunityArticleUploadButton} from '~/pages/community/communityArticleWritePage';
import {GroupArticleBackButton, GroupArticleUploadButton} from 'pages/groups/groupArticleWritePage';
import {CreateThunderExerciseButton} from '~/pages/exercise/createThunderExercisePage';

import {DetailGroupMenu} from '~/widgets/groups/DetailGroupMenu';
import {GroupArticleMenu} from '~/widgets/groups/GroupArticleMenu';
import {DetailGroupArticleBackButton} from '~/pages/groups/detailGroupArticlePage';
import {DetailExerciseMenu} from '~/widgets/exercise/DetailExerciseMenu';
import {EditThunderExerciseButton} from '~/pages/exercise/editThunderExercisePage';
import {CreateGameButton} from '~/widgets/game/createGameButton';
import {EditGameButton} from '~/widgets/game/editGameButton';
import {UserProfileFriendBlock} from '~/entities/profile';
import {ServiceNoticeArticleUploadButton} from '~/pages/serviceNotice/serviceNoticeArticleWritePage';
import {ServiceNoticeArticleMenu} from '~/widgets/serviceNotice/serviceNoticeArticleMenu';
import {BackButtonForAppLink} from '~/shared/ui/common/BackButton';
import {NotificationMenu} from '~/features/notification/notificationMenu';
import {CreateGameBackButton} from '~/pages/game/createGamePage';
import {EditGameBackButton} from '~/pages/game/editGamePage';
import {SafeAreaView} from '@gluestack-ui/themed';
import KakaoLocationTypeShareButton, {KakaoLocationTypes} from '~/shared/invitation/ui/KakaoLocationTypeShareButton.tsx';
import KakaoFeedTypeShareButton, {KakaoShareFeedTypes} from '~/shared/invitation/ui/KakaoFeedTypeShareButton.tsx';

interface TabBarIconProps {
  focused: boolean;
}

/**
 * ### NavigationOptionFuncType
 * #### 사용목적
 * StackNavigation 의 option 을 함수 형태로 전달가능.
 * 주로 동적으로 params 값을 활용하기 위해서 사용
 * @example
 * export const testPageOptionConfig: NavigationOptionFuncType = ({route}) => ({
 *   title: route.params.name,
 *   headerShadowVisible: route.params.isVisible,
 *   ...
 * });
 * */
type NavigationOptionFuncType<PageName extends keyof RootMainStackParamList> = (props: {
  route: RouteProp<RootMainStackParamList, PageName>;
  navigation: any;
}) => NativeStackNavigationOptions;

/** BottomTabPage 들
 */
export const homeTabConfig: BottomTabNavigationOptions = {
  title: '홈',
  headerShown: true,
  headerTitle: () => <React.Fragment />,
  headerLeft: () => {
    return <HeadingTitle>BAEMO</HeadingTitle>;
  },
  headerRight: () => <HeaderButtonGroup />,
  tabBarIcon: ({focused}: TabBarIconProps) => {
    if (focused) {
      return <BottomHomeFocusSvg />;
    }
    return <BottomHomeSvg />;
  },
};

export const activityTabConfig: BottomTabNavigationOptions = {
  title: '내 활동',
  headerShown: true,
  headerTitle: () => <React.Fragment />,
  headerLeft: () => {
    return <HeadingTitle>내 활동</HeadingTitle>;
  },
  headerRight: () => <HeaderButtonGroup />,
  tabBarIcon: ({focused}: TabBarIconProps) => {
    if (focused) {
      return <BottomExerciseFocusSvg />;
    }
    return <BottomExerciseSvg />;
  },
};

export const communityTabConfig: BottomTabNavigationOptions = {
  title: '커뮤니티',
  headerShown: true,
  headerShadowVisible: false,
  headerTitle: () => <React.Fragment />,
  headerLeft: () => {
    return <HeadingTitle>커뮤니티</HeadingTitle>;
  },
  headerRight: () => <HeaderButtonGroup />,
  tabBarIcon: ({focused}: TabBarIconProps) => {
    if (focused) {
      return <BottomCommFocusSvg />;
    }
    return <BottomCommSvg />;
  },
};

export const chattingTabConfig: BottomTabNavigationOptions = {
  title: '채팅',
  headerShown: true,
  headerShadowVisible: false,
  headerTitle: () => <React.Fragment />,
  headerLeft: () => {
    return <HeadingTitle>채팅</HeadingTitle>;
  },
  headerRight: () => <HeaderButtonGroup />,
  tabBarIcon: ({focused}: TabBarIconProps) => {
    if (focused) {
      return <BottomChatFocusSvg />;
    }
    return <BottomChatSvg />;
  },
};

export const profileTabConfig: BottomTabNavigationOptions = {
  title: '프로필',
  headerShown: true,
  headerTitle: () => <React.Fragment />,
  headerLeft: () => {
    return <HeadingTitle>내 프로필</HeadingTitle>;
  },
  headerRight: () => <ProfileHeaderButtonGroup />,
  tabBarIcon: ({focused}: TabBarIconProps) => {
    if (focused) {
      return <BottomProfileFocusSvg />;
    }
    return <BottomProfileSvg />;
  },
};

export const commonPageConfig: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};

export const allExerciseListPageConfig: NativeStackNavigationOptions = {
  title: '전체 운동',
};

export const allGroupListPageConfig: NativeStackNavigationOptions = {
  title: '전체 모임',
};

export const selectChattingFriendPageConfig: NativeStackNavigationOptions = {
  title: '대화상대 선택',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
};

export const notificationPageConfig: NativeStackNavigationOptions = {
  title: '알림',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerRight: () => {
    return <NotificationMenu />;
  },
  headerLeft: () => {
    return <BackButtonForAppLink />;
  },
};

export const SettingPageConfig: NativeStackNavigationOptions = {
  title: '설정',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};

export const CommunityCategoryArticleListPageConfig: NavigationOptionFuncType<'detailCommunityCategoryPage'> = ({route}) => ({
  title: route.params.name,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
});

export const detailExercisePageConfig: NavigationOptionFuncType<'detailExercisePage'> = ({route}) => {
  return {
    headerShadowVisible: false,
    headerTitle: '운동',
    headerStyle: {
      backgroundColor: '#ffffff',
    },
    headerLeft: () => {
      return <BackButton />;
    },
    headerRight: () => {
      return (
        <SafeAreaView style={{flexDirection: 'row', gap: 5}}>
          <KakaoLocationTypeShareButton id={route.params.exerciseId} type={KakaoLocationTypes.EXERCISE} />
          <DetailExerciseMenu exerciseId={route.params.exerciseId} />
        </SafeAreaView>
      );
    },
  };
};

export const detailGroupPageConfig: NavigationOptionFuncType<'detailGroupsPage'> = ({route}) => ({
  headerShadowVisible: false,
  headerTitle: '모임',
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
  headerRight: () => {
    return (
      <SafeAreaView style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <KakaoFeedTypeShareButton id={route.params.groupsId} type={KakaoShareFeedTypes.GROUP} />
        <DetailGroupMenu groupsId={route.params.groupsId} />
      </SafeAreaView>
    );
  },
});

export const editGroupExercisePageConfig: NavigationOptionFuncType<'editGroupExercisePage'> = ({route}) => ({
  title: '모임운동 변경',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
});

export const editThunderExercisePageConfig: NavigationOptionFuncType<'editThunderExercisePage'> = navigation => ({
  title: '번개운동 변경',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
  headerRight: () => {
    return <EditThunderExerciseButton {...navigation} />;
  },
});

export const inviteGuestExercisePageConfig: NavigationOptionFuncType<'inviteGuestExercisePage'> = ({route}) => ({
  title: '게스트 초대',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
});

export const detailGroupArticlePageConfig: NavigationOptionFuncType<'detailGroupArticlePage'> = ({route}) => ({
  headerTitle: '모임 게시글',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <DetailGroupArticleBackButton />;
  },
  headerRight: () => {
    return <GroupArticleMenu {...route.params} />;
  },
});

export const detailArticlePageConfig: NavigationOptionFuncType<'detailArticlePage'> = ({route}) => ({
  title: route.params.title,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
});

export const detailChattingPageConfig: NavigationOptionFuncType<'detailChattingRoomPage'> = ({route}) => ({
  title: route.params.chatRoomName,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
});

export const userProfilePageConfig: NavigationOptionFuncType<'userProfilePage'> = ({route}) => ({
  title: '',
  headerShadowVisible: false,
  headerLeft: () => {
    return <BackButton />;
  },

  headerRight: () => {
    return route.params.chat ? <UserProfileFriendBlock userId={route.params.userId} /> : null;
  },
});

export const editProfilePageConfig: NativeStackNavigationOptions = {
  title: '프로필 편집',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};
export const communityArticleWritePageConfig: NavigationOptionFuncType<'communityArticleWritePage'> = ({route}) => ({
  title: '글쓰기',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <CommunityArticleBackButton />;
  },
  headerRight: () => {
    return <CommunityArticleUploadButton />;
  },
});

export const groupArticleWritePageConfig: NavigationOptionFuncType<'groupArticleWritePage'> = ({route}) => ({
  title: '글쓰기',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <GroupArticleBackButton />;
  },
  headerRight: () => {
    return <GroupArticleUploadButton groupsId={route.params.groupsId} articleId={route.params?.id} />;
  },
});

export const createGroupPageConfig: NativeStackNavigationOptions = {
  title: '',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
  headerRight: () => {
    return <></>;
  },
};

export const editGroupPageConfig: NativeStackNavigationOptions = {
  title: '모임 수정하기',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};

export const createGroupExercisePageConfig: NativeStackNavigationOptions = {
  title: '',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
  headerRight: () => {
    return <></>;
  },
};

export const createThunderExercisePageConfig: NativeStackNavigationOptions = {
  title: '',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
  headerRight: () => {
    return <CreateThunderExerciseButton />;
  },
};

export const createGamePageConfig: NavigationOptionFuncType<'createGamePage'> = ({route}) => ({
  title: '게임 만들기',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <CreateGameBackButton />;
  },
  headerRight: () => {
    const {exerciseId} = route.params;
    return <CreateGameButton exerciseId={exerciseId} />;
  },
});

export const editGamePageConfig: NavigationOptionFuncType<'editGamePage'> = ({route}) => ({
  title: '게임 변경',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <EditGameBackButton />;
  },
  headerRight: () => {
    const {gameId, exerciseId} = route.params;
    return <EditGameButton gameId={gameId} exerciseId={exerciseId} />;
  },
});

export const detailGamePageConfig: NavigationOptionFuncType<'detailGamePage'> = ({route}) => ({
  title: '게임 현황판',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
});

export const detailGameSSEPageConfig: NavigationOptionFuncType<'detailGameSSEPage'> = ({route}) => ({
  title: '게임 현황판',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
});
// MatchGameBackButton

export const matchGamePageConfig: NavigationOptionFuncType<'matchGamePage'> = ({route}) => ({
  headerShown: false,
});

// export const matchGamePageConfig: NavigationOptionFuncType<'matchGamePage'> = ({route}) => ({
//   title: '',
//   headerShadowVisible: false,
//   headerStyle: {
//     backgroundColor: '#ffffff',
//   },
//   gestureEnabled: false,
//   headerLeft: () => {
//     return <MatchGameBackButton gameId={route.params.gameId} />;
//   },
// });

export const reportGroupPageConfig: NativeStackNavigationOptions = {
  title: '모임 신고',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};

export const reportArticlePageConfig: NativeStackNavigationOptions = {
  title: '게시물 신고',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};

export const reportUserPageConfig: NativeStackNavigationOptions = {
  title: '사용자 신고',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};

// export const locationSearchPageConfig: NavigationOptionFuncType<'locationSearchPage'> = () => ({
//   title: '주소 검색',
//   headerShadowVisible: false,
//   headerStyle: {
//     backgroundColor: '#ffffff',
//   },
//   gestureEnabled: false,
//   headerLeft: () => {
//     return <BackButton />;
//   },
// });

export const totalSearchPageConfig: NativeStackNavigationOptions = {
  title: '검색',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};

export const serviceNoticeMainPageConfig: NativeStackNavigationOptions = {
  title: '공지사항',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerLeft: () => {
    return <BackButton />;
  },
};

export const serviceNoticeDetailPageConfig: NavigationOptionFuncType<'serviceNoticeDetailPage'> = ({route}) => ({
  title: '공지사항',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerRight: () => {
    return <ServiceNoticeArticleMenu id={route.params.id} />;
  },
  headerLeft: () => {
    return <BackButton />;
  },
});

export const serviceNoticeArticleWritePageConfig: NavigationOptionFuncType<'serviceNoticeArticleWritePage'> = ({route}) => ({
  title: '공지사항',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  gestureEnabled: false,
  headerLeft: () => {
    return <BackButton />;
  },
  headerRight: () => {
    return <ServiceNoticeArticleUploadButton articleId={route.params.id} />;
  },
});
