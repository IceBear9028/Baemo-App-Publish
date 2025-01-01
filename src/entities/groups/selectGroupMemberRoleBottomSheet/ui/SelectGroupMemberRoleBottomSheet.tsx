import {forwardRef, useCallback, useMemo} from 'react';
import {GroupRole} from '~/shared/mapper/groups';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {RoleStatusCard} from '../ui/RoleStatusCard.tsx';
import {BottomModalHeader} from '~/shared/bottomSheet';
import styled from 'styled-components/native';

interface SelectGroupMemberRoleBottomSheetProps {
  snapPoints?: string[];
  index?: number;
  closeBottomSheet: () => void;
  value?: keyof GroupRole;
  userRole: keyof GroupRole;
  onSelectRole: (input: keyof GroupRole) => void;
}

const roleOptions = new GroupRole();
const roleOptionsList = Object.keys(roleOptions)
  .filter(role => !['NON_MEMBER', 'PENDING'].includes(role))
  .map(role => ({role: role as keyof GroupRole, text: roleOptions[role as keyof GroupRole]}));

export const SelectGroupMemberRoleBottomSheet = forwardRef<BottomSheetModalMethods, SelectGroupMemberRoleBottomSheetProps>(
  ({index = 0, snapPoints = [300], closeBottomSheet, onSelectRole, userRole}, ref) => {
    const userRoleOptionsList = roleOptionsList.filter(role => role.role !== userRole);
    const resultSnapPoints = useMemo(() => snapPoints, []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0} // 이거 추가
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    function selectEvent(input: keyof GroupRole) {
      closeBottomSheet();
      onSelectRole(input);
    }
    return (
      <BottomSheetModal ref={ref} index={index} snapPoints={resultSnapPoints} backdropComponent={renderBackdrop}>
        <BottomModalHeader title={'권한 변경하기'} />
        <StyledContainer>
          {userRoleOptionsList.map((status, index) => {
            return <RoleStatusCard key={`${index}-`} status={status} onPress={() => selectEvent(status.role)} />;
          })}
        </StyledContainer>
      </BottomSheetModal>
    );
  },
);

const StyledContainer = styled.View`
  gap: 16px;
  padding: 10px 20px 0 20px;
`;
