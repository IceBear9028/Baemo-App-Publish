import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {CustomAvatar, ExerciseMemberStatusBadge} from '~/shared/ui';
import {ExerciseMember, ExerciseStatus} from '~/shared/mapper/exercise';
import {ExerciseMenu} from '~/entities/exercise/exerciseMemberCard/ui/ExerciseMenu.tsx';
import {useMyProfileStore} from '~/shared/authentication';
import {useMainNavigate} from '~/shared/route';
import {PlayerLevelBadge} from '~/shared/ui/common/PlayerLevelBadge.tsx';

interface ExerciseMemberCardProps extends ExerciseMember {
  onPress?: () => void;
  exerciseId: number;
  exerciseStatus: keyof ExerciseStatus;
}

export const ExerciseMemberCard = (props: ExerciseMemberCardProps) => {
  const {userId: myUserId} = useMyProfileStore();
  const {navigateUserProfile} = useMainNavigate();
  return (
    <StyledPressContainer onPress={() => navigateUserProfile({userId: props.userProfile.userId, chat: false})}>
      <CustomAvatar {...props.userProfile} />
      <StyledContents>
        <StyledHeaderContainer>
          <StyledCBadgeContainer>
            <Heading size={'sm'} numberOfLines={1}>
              {props.userProfile.name}
            </Heading>
            {props.userRole === 'GUEST' && <Text size={'xs'}>게스트</Text>}
          </StyledCBadgeContainer>
          <ExerciseMemberStatusBadge isAdmin={props.userRole === 'ADMIN'} />
        </StyledHeaderContainer>
        <PlayerLevelBadge {...props.userProfile} />
      </StyledContents>
      {myUserId !== props.userProfile.userId && (
        <ExerciseMenu
          targetUser={props.userProfile}
          targetUserRole={props.userRole}
          exerciseId={props.exerciseId}
          exerciseStatus={props.exerciseStatus}
        />
      )}
    </StyledPressContainer>
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
  align-items: center;
  gap: 8px;
`;
