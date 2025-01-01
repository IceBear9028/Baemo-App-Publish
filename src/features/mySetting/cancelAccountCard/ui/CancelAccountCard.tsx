import React from 'react';
import {Text} from '@gluestack-ui/themed';
import {SettingListCard} from '~/entities/mySetting';
import CancelAccountIcon from '~/shared/images/svg/setting-cancel-account.svg';
import {useFetchCancelAccount} from '~/features/mySetting/cancelAccountCard/model/useFetchCancelAccount.ts';

export const CancelAccountCard = () => {
  const {cancelAccount} = useFetchCancelAccount();
  return (
    <SettingListCard onPress={cancelAccount}>
      <CancelAccountIcon />
      <Text size={'sm'}>회원탈퇴</Text>
    </SettingListCard>
  );
};
