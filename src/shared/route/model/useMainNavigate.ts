import {useNavigation} from '@react-navigation/native';
import {Article, CommunityCategory, ServiceNoticeArticle} from 'shared/mapper/community';
import {Exercise, ExerciseIntro, Game} from '~/shared/mapper/exercise';
import {mainRoutePath, RootMainStackNavigationProp} from '~/shared/route/const/mainRoute.ts';
import {MyProfileResponse} from '~/shared/mapper/userProfile';
import {Groups, GroupsIntro} from '~/shared/mapper/groups';
import {ChattingInfo} from '~/shared/mapper/chatting';

export function useMainNavigate() {
  const mainNavigation = useNavigation<RootMainStackNavigationProp>();

  // 주소 검색 페이지 (다음카카오 library)
  // function navigateToLocationSearch(fromPage: string, initGroup: Groups | undefined) {
  //   mainNavigation.navigate(mainRoutePath.locationSearchPage, {fromPage: fromPage, initGroup: initGroup});
  // }

  // Naver Map SDK Test
  function navigateToTestLocationMap() {
    mainNavigation.navigate(mainRoutePath.locationPage);
  }

  function navigateBack() {
    mainNavigation.goBack();
  }

  function navigateBackForMainTabs() {
    mainNavigation.navigate(mainRoutePath.mainTabs);
  }

  function navigateDetailExercise(exerciseId: Exercise['exerciseId']) {
    mainNavigation.navigate(mainRoutePath.detailExercisePage, {exerciseId});
  }

  function navigateDetailGroup(groupsId: Groups['groupsId']) {
    mainNavigation.navigate(mainRoutePath.detailGroupsPage, {groupsId});
  }

  function navigateEditGroup(input: {groupsId: number; groupIntro: GroupsIntro}) {
    mainNavigation.navigate(mainRoutePath.editGroupsPage, input);
  }

  function navigateAllExerciseListPage() {
    mainNavigation.navigate(mainRoutePath.allExerciseListPage);
  }

  function navigateAllGroupListPage() {
    mainNavigation.navigate(mainRoutePath.allGroupsListPage);
  }

  function navigateDetailArticle(param: Article) {
    mainNavigation.navigate(mainRoutePath.detailArticlePage, param);
  }

  function navigationDetailGroupArticle(id: number, groupsId: number) {
    mainNavigation.navigate(mainRoutePath.detailGroupArticlePage, {id, groupsId});
  }

  function navigateSettingPage() {
    mainNavigation.navigate(mainRoutePath.settingPage);
  }

  function navigateCommunityCategoryArticleListPage(param: CommunityCategory) {
    mainNavigation.navigate(mainRoutePath.detailCommunityCategoryPage, param);
  }

  function navigateCommunityWriteArticlePage(param?: any) {
    mainNavigation.navigate(mainRoutePath.communityArticleWritePage, param);
  }

  function navigateGroupWriteArticlePage(groupsId: number, articleId?: number) {
    mainNavigation.navigate(mainRoutePath.groupArticleWritePage, {groupsId, id: articleId});
  }

  function navigateCreateGroup() {
    mainNavigation.navigate(mainRoutePath.createGroupPage);
  }

  /**
   * ```
   * group? : 모임운동 생성 시, 특정 모임을 미리 선택할 수 있는 옵션
   * isGroupSelectBlocked? : 모임운동 생성 시, 모임 선택을 변경할 수 있는지에 대한 옵션
   * ```
   */
  function navigateCreateGroupExercise(group?: Groups) {
    mainNavigation.navigate(mainRoutePath.createGroupExercisePage, {initGroup: group});
  }

  function navigateInviteGuestExercise(param: Pick<Exercise, 'exerciseId'>) {
    mainNavigation.navigate(mainRoutePath.inviteGuestExercisePage, param);
  }

  function navigationCreateThunderExercise() {
    mainNavigation.navigate(mainRoutePath.createThunderExercisePage);
  }

  function navigateDetailChattingRoom(input: ChattingInfo) {
    mainNavigation.navigate(mainRoutePath.detailChattingRoomPage, input);
  }

  function navigateCreateGame(input: Pick<Exercise, 'exerciseId'>) {
    mainNavigation.navigate(mainRoutePath.createGamePage, input);
  }

  function navigateEditGame(prevGame: Game) {
    mainNavigation.navigate(mainRoutePath.editGamePage, prevGame);
  }
  function navigateCheckChattingFriend() {
    mainNavigation.navigate(mainRoutePath.selectChattingFriendPage);
  }

  function navigateDetailGame(gameId: Game['gameId']) {
    mainNavigation.navigate(mainRoutePath.detailGamePage, {gameId});
  }

  function navigateDetailSSEGame(gameId: Game['gameId']) {
    mainNavigation.navigate(mainRoutePath.detailGameSSEPage, {gameId});
  }

  function navigateMatchGame(gameId: Game['gameId']) {
    mainNavigation.navigate(mainRoutePath.matchGamePage, {gameId});
  }

  function navigateEditGroupExercise(input: ExerciseIntro) {
    mainNavigation.navigate(mainRoutePath.editGroupExercisePage, input);
  }

  function navigateEditThunderExercise(input: ExerciseIntro) {
    mainNavigation.navigate(mainRoutePath.editThunderExercisePage, input);
  }

  function navigateUserProfile(input: {userId: number; chat: boolean}) {
    mainNavigation.navigate(mainRoutePath.userProfilePage, input);
  }

  function navigateEditProfile(input: MyProfileResponse) {
    mainNavigation.navigate(mainRoutePath.editProfilePage, input);
  }

  function navigateTotalSearchPage() {
    mainNavigation.navigate(mainRoutePath.totalSearchPage);
  }

  function navigateTermsOfServiceWebView(url: string) {
    mainNavigation.navigate(mainRoutePath.termsOfServiceWebViewPage, {url});
  }
  function navigateNotificationPage() {
    mainNavigation.navigate(mainRoutePath.notificationPage);
  }

  /** notice 도메인 페이지 **/
  function navigateServiceNoticeMainPage() {
    mainNavigation.navigate(mainRoutePath.serviceNoticeMainPage);
  }

  function navigateServiceNoticeDetailPage(id: ServiceNoticeArticle['id']) {
    mainNavigation.navigate(mainRoutePath.serviceNoticeDetailPage, {id});
  }

  function navigateServiceNoticeArticleWritePage(id?: number) {
    mainNavigation.navigate(mainRoutePath.serviceNoticeArticleWritePage, {id});
  }

  /* 신고 도메인 페이지 */
  function navigateReportUser(userId: number) {
    mainNavigation.navigate(mainRoutePath.reportUserPage, {userId});
  }

  function navigateReportArticle(reportId: number) {
    mainNavigation.navigate(mainRoutePath.reportArticlePage, {id: reportId});
  }

  function navigateReportGroup(groupsId: number) {
    mainNavigation.navigate<any>(mainRoutePath.reportGroupPage, {groupsId});
  }

  return {
    // navigateToLocationSearch,
    navigateToTestLocationMap,
    navigateBack,
    navigateBackForMainTabs,
    navigateDetailExercise,
    navigateDetailGroup,
    navigateEditGroup,
    navigateAllExerciseListPage,
    navigateAllGroupListPage,
    navigateDetailArticle,
    navigationDetailGroupArticle,
    navigateSettingPage,
    navigateCommunityCategoryArticleListPage,
    navigateCommunityWriteArticlePage,
    navigateGroupWriteArticlePage,
    navigateCreateGroup,
    navigateCreateGroupExercise,
    navigationCreateThunderExercise,
    navigateDetailChattingRoom,
    navigateInviteGuestExercise,
    navigateCreateGame,
    navigateEditGame,
    navigateDetailGame,
    navigateDetailSSEGame,
    navigateCheckChattingFriend,
    navigateMatchGame,
    navigateEditGroupExercise,
    navigateEditThunderExercise,
    navigateReportGroup,
    navigateReportArticle,
    navigateReportUser,
    navigateUserProfile,
    navigateEditProfile,
    navigateTotalSearchPage,
    navigateTermsOfServiceWebView,
    navigateNotificationPage,
    navigateServiceNoticeMainPage,
    navigateServiceNoticeDetailPage,
    navigateServiceNoticeArticleWritePage,
  };
}
