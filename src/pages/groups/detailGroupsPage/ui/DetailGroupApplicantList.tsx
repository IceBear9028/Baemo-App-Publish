import styled from 'styled-components/native';
import {GroupGuestList} from '~/features/groups/groupGuestList';
import {RouteProp} from '@react-navigation/native';
import {DetailGatheringTabRoute} from '~/pages/groups/detailGroupsPage/ui/DetailGroupsPage.tsx';

interface DetailGroupApplicantListProps {
  route: RouteProp<DetailGatheringTabRoute, 'applicantList'>;
  navigation: any;
}

export const DetailGroupApplicantList = ({route}: DetailGroupApplicantListProps) => {
  return (
    <StyledContainer>
      <GroupGuestList groupsId={route.params.groupsId} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
