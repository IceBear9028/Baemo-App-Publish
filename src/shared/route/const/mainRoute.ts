import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {ChattingInfo} from '~/shared/mapper/chatting';
import {Groups, GroupsIntro} from '~/shared/mapper/groups';
import {Exercise, ExerciseIntro, Game} from '~/shared/mapper/exercise';
import {Article, CommunityCategory, ServiceNoticeArticle} from '~/shared/mapper/community';
import {GroupArticle} from '~/shared/mapper/groups';
import {MyProfileResponse, UserProfile} from '~/shared/mapper/userProfile';
import {Deeplink} from '~/shared/mapper/notification/lib/notificationList';

export const mainRoutePath = {
  /* 메인 페이지 */
  mainTabs: 'mainTabs',
  allExerciseListPage: 'allExerciseListPage', //DeepLink
  allGroupsListPage: 'allGroupsListPage', //DeepLink
  settingPage: 'settingPage',
  totalSearchPage: 'totalSearchPage',
  notificationPage: 'notificationPage',
  termsOfServiceWebViewPage: 'termsOfServiceWebViewPage',
  locationPage: 'locationPage',
  // locationSearchPage: 'locationSearchPage',

  /* 모임 도메인 */
  createGroupPage: 'createGroupPage',
  detailGroupsPage: 'detailGroupsPage', //DeepLink
  editGroupsPage: 'editGroupsPage',
  detailGroupArticlePage: 'detailGroupArticlePage', //DeepLink
  groupArticleWritePage: 'groupArticleWritePage',

  /* 운동 도메인 */
  detailExercisePage: 'detailExercisePage', //DeepLink
  editGroupExercisePage: 'editGroupExercisePage',
  editThunderExercisePage: 'editThunderExercisePage',
  inviteGuestExercisePage: 'inviteGuestExercisePage', //DeepLink
  createThunderExercisePage: 'createThunderExercisePage',
  createGroupExercisePage: 'createGroupExercisePage',

  /* 게임 도메인 */
  matchGamePage: 'matchGamePage', //DeepLink
  editGamePage: 'editGamePage',
  createGamePage: 'createGamePage',
  detailGamePage: 'detailGamePage', //DeepLink
  detailGameSSEPage: 'detailGameSSEPage', //DeepLink

  /* 커뮤니티 도메인 */
  detailArticlePage: 'detailArticlePage', //DeepLink
  detailCommunityCategoryPage: 'detailCommunityCategoryPage', //DeepLink
  communityArticleWritePage: 'communityArticleWritePage',

  /* 채팅 도메인 */
  detailChattingRoomPage: 'detailChattingRoomPage', //DeepLink
  selectChattingFriendPage: 'selectChattingFriendPage',

  /* 프로필 도메인 */
  userProfilePage: 'userProfilePage',
  editProfilePage: 'editProfilePage',

  /* 공지사항 페이지 */
  serviceNoticeMainPage: 'serviceNoticeMainPage',
  serviceNoticeDetailPage: 'serviceNoticeDetailPage', //DeepLink
  serviceNoticeArticleWritePage: 'serviceNoticeArticleWritePage',

  /* 신고 도메인 */
  reportArticlePage: 'reportArticlePage',
  reportGroupPage: 'reportGroupPage',
  reportUserPage: 'reportUserPage',
};

/** React Navigation 의 Stack 페이지 이동 간 파라미터 type
 * - Stack 페이지 이동 시 react-navigation 의 route 객체 타입을 지정
 */
export type RootMainStackParamList = {
  /* 메인 페이지 */
  mainTabs: undefined;
  allExerciseListPage: undefined; //DeepLink
  allGroupsListPage: undefined; //DeepLink
  settingPage: undefined;
  totalSearchPage: undefined;
  notificationPage: Deeplink;
  termsOfServiceWebViewPage: {
    url: string;
  };
  // locationSearchPage: {fromPage: string; initGroup: Groups | undefined};
  isGroupExercise: boolean;
  isThunderExercise: boolean;

  /* 모임 도메인 */
  createGroupPage: undefined;
  detailGroupsPage: Pick<Groups, 'groupsId'>; //DeepLink
  editGroupsPage: {groupsId: number; groupIntro: GroupsIntro};
  detailGroupArticlePage: Pick<Groups, 'groupsId'> & Pick<GroupArticle, 'id'>; //DeepLink
  groupArticleWritePage: Pick<Groups, 'groupsId'> & Partial<Pick<GroupArticle, 'id'>>;

  /* 운동 도메인 */
  detailExercisePage: Pick<Exercise, 'exerciseId'>; //DeepLink
  editGroupExercisePage: ExerciseIntro;
  editThunderExercisePage: ExerciseIntro;
  inviteGuestExercisePage: Pick<Exercise, 'exerciseId'>; //DeepLink
  createThunderExercisePage: undefined;
  createGroupExercisePage: {initGroup?: Groups};

  /* 게임 도메인 */
  matchGamePage: Pick<Game, 'gameId'>; //DeepLink
  editGamePage: Game;
  createGamePage: Pick<Exercise, 'exerciseId'>;
  detailGamePage: Pick<Game, 'gameId'>; //DeepLink
  detailGameSSEPage: Pick<Game, 'gameId'>; //DeepLink

  /* 커뮤니티 도메인 */
  detailArticlePage: Article; //DeepLink
  detailCommunityCategoryPage: CommunityCategory; //DeepLink
  communityArticleWritePage: CommunityCategory;

  /* 채팅 도메인 */
  detailChattingRoomPage: ChattingInfo; //DeepLink
  selectChattingFriendPage: undefined;

  /* 프로필 도메인 */
  userProfilePage: {userId: number; chat: boolean};
  editProfilePage: MyProfileResponse;

  /* 공지사항 페이지 */
  serviceNoticeMainPage: undefined;
  serviceNoticeDetailPage: Pick<ServiceNoticeArticle, 'id'>; //DeepLink
  serviceNoticeArticleWritePage: Pick<ServiceNoticeArticle, 'id'>;

  /* 신고 도메인 */
  reportUserPage: Pick<UserProfile, 'userId'>;
  reportArticlePage: Pick<Article, 'id'>;
  reportGroupPage: Pick<Groups, 'groupsId'>;
} & ParamListBase;

/** React Navigation useNavigation() 전용 파라미터 type
 * - useMainNavigate() 전용 타입
 */
export type RootMainStackNavigationProp = NativeStackNavigationProp<RootMainStackParamList>;
