import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Groups} from '~/shared/mapper/groups';
import {TopTabBarConfig} from '~/shared/config';
import {RootMainStackParamList} from '~/shared/route';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {DetailGroupsHome} from '~/widgets/groups/DetailGroupsHome';
import {DetailGroupMemberList} from '~/widgets/groups/DetailGroupMemberList';
import {DetailGroupsExerciseList} from '~/widgets/groups/DetailGroupsExerciseList';
import {DetailApplyGroupButton} from '~/widgets/groups/DetailApplyGroupButton';
import {useGroupRoleStore} from '~/features/groups/detailGroupsIntroduction';
import {DetailGroupApplicantList} from '../ui/DetailGroupApplicantList';
import {DetailGroupsNoticeboard} from '../ui/DetailGroupsNoticeboard';

type DetailGatheringPageProps = {} & NativeStackScreenProps<RootMainStackParamList, 'detailGroupsPage'>;

export type DetailGatheringTabRoute = {
  home: Pick<Groups, 'groupsId'>;
  noticeBoard: Pick<Groups, 'groupsId'>;
  participants: Pick<Groups, 'groupsId'>;
  exerciseList: Groups;
  applicantList: Pick<Groups, 'groupsId'>;
};

const Tab = createMaterialTopTabNavigator<DetailGatheringTabRoute>();

export const DetailGroupsPage = ({route}: DetailGatheringPageProps) => {
  const {role} = useGroupRoleStore();
  return (
    <StyledContainer>
      <ApiErrorBoundary>
        <Tab.Navigator>
          <Tab.Screen name={'home'} component={DetailGroupsHome} options={() => TopTabBarConfig('Home')} initialParams={route.params} />
          {!['NON_MEMBER', 'PENDING'].includes(role) && (
            <Tab.Screen
              name={'noticeBoard'}
              component={DetailGroupsNoticeboard}
              options={() => TopTabBarConfig('게시판')}
              initialParams={route.params}
            />
          )}
          <Tab.Screen
            name={'participants'}
            component={DetailGroupMemberList}
            options={() => TopTabBarConfig('멤버')}
            initialParams={route.params}
          />
          <Tab.Screen
            name={'exerciseList'}
            component={DetailGroupsExerciseList}
            options={() => TopTabBarConfig('운동')}
            initialParams={route.params}
          />
          {['ADMIN', 'MANAGER'].includes(role) && (
            <Tab.Screen
              name={'applicantList'}
              component={DetailGroupApplicantList}
              options={() => TopTabBarConfig('신청자')}
              initialParams={route.params}
            />
          )}
        </Tab.Navigator>
      </ApiErrorBoundary>
      <DetailApplyGroupButton groupId={route.params.groupsId} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: space-around;
`;
