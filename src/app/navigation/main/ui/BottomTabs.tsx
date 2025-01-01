import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainCommunityPage} from '~/pages/community/mainCommunityPage';
import {MainProfilePage} from '~/pages/profile/mainProfilePage';
import {MyActivityPage} from '~/pages/exercise/myActivityPage';
import {ChattingPage} from '~/pages/chatting/mainChattingPage';
import {MainHomePage} from '~/pages/home/mianHomePage';
import {activityTabConfig, chattingTabConfig, communityTabConfig, homeTabConfig, profileTabConfig} from '../config/tabConfig.tsx';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        // tabBarItemStyle: {paddingVertical: 10},
        tabBarStyle: {
          // height: 80,
          // paddingBottom: 30,
          // paddingTop: 10,
          // gap: 16,
        },
      }}>
      {/* 1. 도메인별 메인 페이지 */}
      <Tab.Screen name="Home" component={MainHomePage} options={homeTabConfig} />
      <Tab.Screen name="Activity" component={MyActivityPage} options={activityTabConfig} />
      {/*<Tab.Screen name="Community" component={MainCommunityPage} options={communityTabConfig} />*/}
      <Tab.Screen name="Chatting" component={ChattingPage} options={chattingTabConfig} />
      <Tab.Screen name="Profile" component={MainProfilePage} options={profileTabConfig} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
