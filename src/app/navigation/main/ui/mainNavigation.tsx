import React from 'react';
import BottomTabs from '~/app/navigation/main/ui/BottomTabs.tsx';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {mainRoutePath, RootMainStackParamList} from '~/shared/route';
import {deepLinkConfig} from '../config/deepLinkConfig.ts';
import {
  commonPageConfig,
  communityArticleWritePageConfig,
  CommunityCategoryArticleListPageConfig,
  createGamePageConfig,
  createGroupExercisePageConfig,
  createGroupPageConfig,
  createThunderExercisePageConfig,
  detailArticlePageConfig,
  detailChattingPageConfig,
  detailExercisePageConfig,
  detailGroupArticlePageConfig,
  detailGroupPageConfig,
  editGamePageConfig,
  editGroupExercisePageConfig,
  editGroupPageConfig,
  editThunderExercisePageConfig,
  groupArticleWritePageConfig,
  matchGamePageConfig,
  allExerciseListPageConfig,
  allGroupListPageConfig,
  reportArticlePageConfig,
  reportGroupPageConfig,
  reportUserPageConfig,
  SettingPageConfig,
  selectChattingFriendPageConfig,
  userProfilePageConfig,
  editProfilePageConfig,
  detailGamePageConfig,
  detailGameSSEPageConfig,
  inviteGuestExercisePageConfig,
  totalSearchPageConfig,
  notificationPageConfig,
  serviceNoticeMainPageConfig,
  serviceNoticeDetailPageConfig,
  serviceNoticeArticleWritePageConfig,
} from '~/app/navigation/main/config/tabConfig.tsx';
import {DetailGroupsPage} from '~/pages/groups/detailGroupsPage';
import {DetailArticlePage} from '~/pages/community/detailArticlePage';
import {DetailExercisePage} from '~/pages/exercise/detailExercisePage';
import {AllExerciseListPage} from '~/pages/exercise/allExerciseListPage';
import {AllGroupsListPage} from 'pages/groups/allGroupListPage';
import {SettingPage} from '~/pages/setting';
import {CommunityArticleWritePage} from '~/pages/community/communityArticleWritePage';
import {CommunityCategoryArticleListPage} from '~/pages/community/communityCategoryArticleListPage';
import {GroupArticleWritePage} from 'pages/groups/groupArticleWritePage';
import {CreateGroupPage} from '~/pages/groups/createGroupPage';
import {CreateGroupExercisePage} from '~/pages/exercise/createGroupExercisePage';
import {CreateThunderExercisePage} from 'pages/exercise/createThunderExercisePage';
import {DetailChattingRoomPage} from '~/pages/chatting/detailChattingRoomPage';
import {CheckFriendPage} from '~/pages/chatting/selectChattingFriendPage';
import {CreateGamePage} from '~/pages/game/createGamePage';
import {EditGamePage} from '~/pages/game/editGamePage';
import {EditGroupPage} from '~/pages/groups/editGroupPage';
import {MatchGamePage} from '~/pages/game/matchGamePage';
import {DetailGroupArticlePage} from '~/pages/groups/detailGroupArticlePage';
import {useMessagePermission} from '~/shared/deviceInfo';
import {EditGroupExercisePage} from '~/pages/exercise/editGroupExercisePage';
import {EditThunderExercisePage} from '~/pages/exercise/editThunderExercisePage';
import {ReportGroupPage} from '~/pages/report/reportGroupPage';
import {ReportArticlePage} from '~/pages/report/reportArticlePage';
import {ReportUserPage} from '~/pages/report/reportUserPage';
import {useInitMyProfile} from '~/shared/authentication';
import {usePrivacyPermission} from '~/shared/permission/model/usePrivacyPermission.ts';
import {UserProfilePage} from '~/pages/profile/userProfilePage';
import {EditProfilePage} from '~/pages/profile/editProfilePage';
import {DetailGamePage, DetailGameSSEPage} from '~/pages/game/detailGamePage';
import {InviteGuestExercisePage} from '~/pages/exercise/inviteGuestExercisePage';
import {TotalSearchPage} from '~/pages/search/totalSearchPage';
import {TermsOfServiceWebViewConfig} from '~/app/navigation/login/config/tabConfig.tsx';
import {TermsOfServiceWebView} from '~/pages/login/termsOfServiceWebViewPage';
import {NotificationPage} from '~/pages/notification';
import {ServiceNoticeMainPage} from '~/pages/serviceNotice/serviceNoticeMainPage';
import {ServiceNoticeDetailPage} from '~/pages/serviceNotice/serviceNoticeDetailPage';
import {ServiceNoticeArticleWritePage} from '~/pages/serviceNotice/serviceNoticeArticleWritePage';
// import {LocationSearchPage} from '~/pages/location/ui/LocationSearchPage.tsx';

const MainStack = createNativeStackNavigator<RootMainStackParamList>();

interface MainNavigatorProps {
  theme: Theme;
}

export const MainNavigator = ({theme}: MainNavigatorProps) => {
  useInitMyProfile();
  useMessagePermission();
  usePrivacyPermission();
  return (
    <NavigationContainer theme={theme} linking={deepLinkConfig}>
      <MainStack.Navigator>
        <MainStack.Group screenOptions={{headerShown: false, headerBackTitleVisible: false}}>
          <MainStack.Screen name={mainRoutePath.mainTabs} component={BottomTabs} />
        </MainStack.Group>
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.detailArticlePage as 'detailArticlePage'}
            options={detailArticlePageConfig}
            component={DetailArticlePage}
          />
        </MainStack.Group>
        {/*Naver Map SDK Test*/}
        {/*<MainStack.Group>*/}
        {/*  <MainStack.Screen*/}
        {/*    name={mainRoutePath.locationPage as 'locationPage'}*/}
        {/*    // options={}*/}
        {/*    component={TestLocation}*/}
        {/*  />*/}
        {/*</MainStack.Group>*/}
        <MainStack.Group screenOptions={commonPageConfig}>
          <MainStack.Screen name={mainRoutePath.allExerciseListPage} options={allExerciseListPageConfig} component={AllExerciseListPage} />
          <MainStack.Screen
            name={mainRoutePath.allGroupsListPage as 'allGroupsListPage'}
            options={allGroupListPageConfig}
            component={AllGroupsListPage}
          />
        </MainStack.Group>

        {/** group 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.createGroupPage as 'createGroupPage'}
            options={createGroupPageConfig}
            component={CreateGroupPage}
          />
          <MainStack.Screen
            name={mainRoutePath.detailGroupsPage as 'detailGroupsPage'}
            options={detailGroupPageConfig}
            component={DetailGroupsPage}
          />
          <MainStack.Screen
            name={mainRoutePath.editGroupsPage as 'editGroupsPage'}
            options={editGroupPageConfig}
            component={EditGroupPage}
          />
          <MainStack.Screen
            name={mainRoutePath.groupArticleWritePage as 'groupArticleWritePage'}
            options={groupArticleWritePageConfig}
            component={GroupArticleWritePage}
          />
          <MainStack.Screen
            name={mainRoutePath.detailGroupArticlePage as 'detailGroupArticlePage'}
            component={DetailGroupArticlePage}
            options={detailGroupArticlePageConfig}
          />
        </MainStack.Group>

        {/** Community 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.detailCommunityCategoryPage as 'detailCommunityCategoryPage'}
            options={CommunityCategoryArticleListPageConfig}
            component={CommunityCategoryArticleListPage}
          />
          <MainStack.Screen
            name={mainRoutePath.communityArticleWritePage as 'communityArticleWritePage'}
            options={communityArticleWritePageConfig}
            component={CommunityArticleWritePage}
          />
        </MainStack.Group>

        {/** exercise 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.createGroupExercisePage as 'createGroupExercisePage'}
            options={createGroupExercisePageConfig}
            component={CreateGroupExercisePage}
          />
          <MainStack.Screen
            name={mainRoutePath.createThunderExercisePage as 'createThunderExercisePage'}
            options={createThunderExercisePageConfig}
            component={CreateThunderExercisePage}
          />
          <MainStack.Screen
            name={mainRoutePath.detailExercisePage as 'detailExercisePage'}
            options={detailExercisePageConfig}
            component={DetailExercisePage}
          />
          <MainStack.Screen
            name={mainRoutePath.editGroupExercisePage as 'editGroupExercisePage'}
            options={editGroupExercisePageConfig}
            component={EditGroupExercisePage}
          />
          <MainStack.Screen
            name={mainRoutePath.editThunderExercisePage as 'editThunderExercisePage'}
            options={editThunderExercisePageConfig}
            component={EditThunderExercisePage}
          />
          <MainStack.Screen
            name={mainRoutePath.inviteGuestExercisePage as 'inviteGuestExercisePage'}
            options={inviteGuestExercisePageConfig}
            component={InviteGuestExercisePage}
          />
        </MainStack.Group>

        {/** game 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.createGamePage as 'createGamePage'}
            options={createGamePageConfig}
            component={CreateGamePage}
          />
          <MainStack.Screen name={mainRoutePath.editGamePage as 'editGamePage'} options={editGamePageConfig} component={EditGamePage} />
          <MainStack.Screen name={mainRoutePath.matchGamePage as 'matchGamePage'} options={matchGamePageConfig} component={MatchGamePage} />
          <MainStack.Screen
            name={mainRoutePath.detailGamePage as 'detailGamePage'}
            options={detailGamePageConfig}
            component={DetailGamePage}
          />
          <MainStack.Screen
            name={mainRoutePath.detailGameSSEPage as 'detailGameSSEPage'}
            options={detailGameSSEPageConfig}
            component={DetailGameSSEPage}
          />
        </MainStack.Group>

        {/** chatting 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.detailChattingRoomPage as 'detailChattingRoomPage'}
            options={detailChattingPageConfig}
            component={DetailChattingRoomPage}
          />
          <MainStack.Screen
            name={mainRoutePath.selectChattingFriendPage}
            options={selectChattingFriendPageConfig}
            component={CheckFriendPage}
          />
          <MainStack.Screen
            name={mainRoutePath.userProfilePage as 'userProfilePage'}
            options={userProfilePageConfig}
            component={UserProfilePage}
          />
        </MainStack.Group>

        {/** 신고 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.reportGroupPage as 'reportGroupPage'}
            options={reportGroupPageConfig}
            component={ReportGroupPage}
          />
          <MainStack.Screen
            name={mainRoutePath.reportArticlePage as 'reportArticlePage'}
            options={reportArticlePageConfig}
            component={ReportArticlePage}
          />
          <MainStack.Screen
            name={mainRoutePath.reportUserPage as 'reportUserPage'}
            options={reportUserPageConfig}
            component={ReportUserPage}
          />
        </MainStack.Group>

        {/** mySetting 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen name={mainRoutePath.settingPage} options={SettingPageConfig} component={SettingPage} />
          <MainStack.Screen
            name={mainRoutePath.termsOfServiceWebViewPage as 'termsOfServiceWebViewPage'}
            options={TermsOfServiceWebViewConfig}
            component={TermsOfServiceWebView}
          />
        </MainStack.Group>

        {/** myProfile 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.editProfilePage as 'editProfilePage'}
            options={editProfilePageConfig}
            component={EditProfilePage}
          />
        </MainStack.Group>

        {/** Search 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.totalSearchPage as 'totalSearchPage'}
            options={totalSearchPageConfig}
            component={TotalSearchPage}
          />
        </MainStack.Group>

        {/* 알림 페이지 */}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.notificationPage as 'notificationPage'}
            options={notificationPageConfig}
            component={NotificationPage}
          />
        </MainStack.Group>

        {/** ServiceNotice 페이지 **/}
        <MainStack.Group>
          <MainStack.Screen
            name={mainRoutePath.serviceNoticeMainPage as 'serviceNoticeMainPage'}
            options={serviceNoticeMainPageConfig}
            component={ServiceNoticeMainPage}
          />
          <MainStack.Screen
            name={mainRoutePath.serviceNoticeDetailPage as 'serviceNoticeDetailPage'}
            options={serviceNoticeDetailPageConfig}
            component={ServiceNoticeDetailPage}
          />
          <MainStack.Screen
            name={mainRoutePath.serviceNoticeArticleWritePage as 'serviceNoticeArticleWritePage'}
            options={serviceNoticeArticleWritePageConfig}
            component={ServiceNoticeArticleWritePage}
          />
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
