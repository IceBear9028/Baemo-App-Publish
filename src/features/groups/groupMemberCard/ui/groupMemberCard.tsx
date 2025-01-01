import styled from 'styled-components/native';
import {Heading} from '@gluestack-ui/themed';
import {CustomAvatar, GroupMemberStatusBadge} from '~/shared/ui';
import {GroupMember, GroupRole, Groups} from '~/shared/mapper/groups';
import {GroupMemberMenu} from '~/features/groups/groupMemberCard/ui/GroupMemberMenu.tsx';
import {useMainNavigate} from '~/shared/route';
import {PlayerLevelBadge} from '~/shared/ui/common/PlayerLevelBadge.tsx';

interface GroupMemberCardProps extends GroupMember, Pick<Groups, 'groupsId'> {
  onPress?: () => void;
  myRole: keyof GroupRole;
}

export const GroupMemberCard = ({onPress, groupsId, userProfile, memberStatus, myRole}: GroupMemberCardProps) => {
  const {navigateUserProfile} = useMainNavigate();
  return (
    userProfile && (
      <StyledPressContainer onPress={() => navigateUserProfile({userId: userProfile.userId, chat: false})}>
        <CustomAvatar {...userProfile} />
        <StyledContents>
          <StyledHeaderContainer>
            <StyledCBadgeContainer>
              <Heading size={'sm'} numberOfLines={1}>
                {userProfile.name}
              </Heading>
            </StyledCBadgeContainer>
            <GroupMemberStatusBadge status={memberStatus} />
          </StyledHeaderContainer>
          <PlayerLevelBadge {...userProfile} />
        </StyledContents>
        <GroupMemberMenu memberStatus={memberStatus} groupsId={groupsId} myRole={myRole} userProfile={userProfile} />
      </StyledPressContainer>
    )
  );
};

const StyledPressContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 20px;
  gap: 16px;
`;

const StyledContents = styled.View`
  flex: 1;
  justify-content: center;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCBadgeContainer = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;
