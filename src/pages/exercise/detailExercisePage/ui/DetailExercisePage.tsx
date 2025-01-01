import styled from 'styled-components/native';
import {Exercise} from '~/shared/mapper/exercise';
import {TopTabBarConfig} from '~/shared/config';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DetailExerciseGameBoard} from '~/widgets/exercise/DetailExerciseGameBoard';
import {DetailExerciseHome} from '~/widgets/exercise/DetailExerciseHome';
import {DetailExerciseMembers} from '~/widgets/exercise/DetailExerciseMembers';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {DetailApplyExerciseButton} from '~/widgets/exercise/DetailApplyExerciseButton';
import {DetailExerciseApplyGuestList} from '~/widgets/exercise/DetailExerciseApplyGuestList';
import {DetailThunderExerciseApplyList} from '~/widgets/exercise/DetailThunderExerciseApplyList';
import {EditGameSettingList} from '~/widgets/game/editGameSettingList';

// Tab 컴포넌트에 route.params 객체를 넘길 때의 타입
type DetailExerciseTabBarRoute = {
  home: Exercise;
  gameBoard: Exercise;
  participants: Exercise;
  guest: Exercise;
  apply: Exercise;
  settingGame: Exercise;
};
type DetailExercisePageProps = {} & NativeStackScreenProps<RootMainStackParamList, 'detailExercisePage'>;

const Tab = createMaterialTopTabNavigator<DetailExerciseTabBarRoute>();

export const DetailExercisePage = ({route}: DetailExercisePageProps) => {
  const {type, role, status} = useExerciseRoleStore();
  return (
    <StyledContainer>
      <ApiErrorBoundary>
        <Tab.Navigator>
          {/** 일단 임시방편으로 함. 추후에 꼭 고칠 것 **/}
          <Tab.Screen
            name={'home'}
            component={DetailExerciseHome as any}
            options={() => TopTabBarConfig('Home')}
            initialParams={route.params}
          />
          <Tab.Screen
            name={'gameBoard'}
            component={DetailExerciseGameBoard as any}
            options={() => TopTabBarConfig('게임 현황')}
            initialParams={route.params}
          />
          <Tab.Screen
            name={'participants'}
            component={DetailExerciseMembers as any}
            options={() => TopTabBarConfig('참가자')}
            initialParams={route.params as any}
          />
          {type === 'CLUB' && role === 'ADMIN' && status !== 'COMPLETE' && (
            <Tab.Screen
              name={'guest'}
              component={DetailExerciseApplyGuestList as any}
              options={() => TopTabBarConfig('게스트')}
              initialParams={route.params as any}
            />
          )}
          {type === 'IMPROMPTU' && role === 'ADMIN' && status !== 'COMPLETE' && (
            <Tab.Screen
              name={'apply'}
              component={DetailThunderExerciseApplyList as any}
              options={() => TopTabBarConfig('신청자')}
              initialParams={route.params as any}
            />
          )}
          {role === 'ADMIN' && status !== 'COMPLETE' && (
            <Tab.Screen
              name={'settingGame'}
              component={EditGameSettingList as any}
              options={() => TopTabBarConfig('게임 관리')}
              initialParams={route.params as any}
            />
          )}
        </Tab.Navigator>
      </ApiErrorBoundary>
      <DetailApplyExerciseButton exerciseId={route.params.exerciseId} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: space-around;
`;
