import styled from 'styled-components/native';
import {GroupMemberList} from 'widgets/groups/groupMembersList';
import {RouteProp} from '@react-navigation/native';
import {DetailGatheringTabRoute} from '~/pages/groups/detailGroupsPage/ui/DetailGroupsPage.tsx';

interface DetailGroupMemberListProps {
  route: RouteProp<DetailGatheringTabRoute, 'participants'>;
  navigation: any;
}

export const DetailGroupMemberList = ({route}: DetailGroupMemberListProps) => {
  return (
    <StyledContainer>
      <GroupMemberList groupsId={route.params.groupsId} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
