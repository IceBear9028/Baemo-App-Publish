import styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopTabBarConfig} from '~/shared/config';
import {UserProfileCard} from '~/features/profile/userProfileCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import {UserExerciseList} from '~/features/user/userExerciseList';
import {UserGroupList} from '~/features/user/userGroupList';

export type UserProfileTabBarRoute = {
  userGroups: {userId: number};
  userGames: {userId: number};
};

type UserProfilePageProps = {} & NativeStackScreenProps<RootMainStackParamList, 'userProfilePage'>;
const Tab = createMaterialTopTabNavigator<UserProfileTabBarRoute>();

export const UserProfilePage = ({route}: UserProfilePageProps) => {
  const userId = route.params.userId;

  return (
    <StyledContainer>
      <UserProfileCard userId={userId} />
      <Tab.Navigator>
        <Tab.Screen name={'userGroups'} component={UserGroupList} initialParams={{userId}} options={() => TopTabBarConfig('가입한 모임')} />
        <Tab.Screen
          name={'userGames'}
          component={UserExerciseList}
          initialParams={{userId}}
          options={() => TopTabBarConfig('참가한 게임')}
        />
      </Tab.Navigator>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
