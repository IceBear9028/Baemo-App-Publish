import {GroupRole} from '~/shared/mapper/groups';
import {CategoryButton, GroupMemberStatusBadge} from '~/shared/ui';
import {Text} from '@gluestack-ui/themed';

interface RoleStatusCardProps {
  status: {
    role: keyof GroupRole;
    text: GroupRole[keyof GroupRole];
  };
  isSelect?: boolean;
  onPress?: () => void;
}

export const RoleStatusCard = ({onPress, status, isSelect}: RoleStatusCardProps) => {
  console.log(status);
  function pressEvent() {
    onPress && onPress();
  }
  return (
    <CategoryButton onPress={pressEvent} icon={<GroupMemberStatusBadge status={status.role} />}>
      {status.role === 'MEMBER' ? <Text bold>{status.text}</Text> : <></>}
    </CategoryButton>
  );
};
