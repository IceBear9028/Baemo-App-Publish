import {useState} from 'react';
import {GroupRole} from '~/shared/mapper/groups';

export function useSelectMemberRole() {
  const [selectRole, setSelectRole] = useState<keyof GroupRole>();
  return {selectRole, setSelectRole};
}
