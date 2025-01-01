import {Fragment} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonText} from '@gluestack-ui/themed';
import {
  useFetchPostApproveRequestFriend,
  useFetchPostRefuseRequestFriend,
} from '~/features/profile/myRequestFriendList/model/usePostRequestFriend.ts';

interface RequestFriendButtonProps {
  targetId: number;
  // text: string;
}

export const ApproveFriendButton = ({targetId}: RequestFriendButtonProps) => {
  const {mutate} = useFetchPostApproveRequestFriend(targetId);

  const handleApproveFriend = () => {
    mutate();
  };
  return (
    <Fragment>
      <Button size={'xs'} variant={'link'} onPress={handleApproveFriend}>
        <ButtonText>승인</ButtonText>
      </Button>
    </Fragment>
  );
};

export const RefuseFriendButton = ({targetId}: RequestFriendButtonProps) => {
  const {mutate} = useFetchPostRefuseRequestFriend(targetId);

  const handleRefuseFriend = () => {
    mutate();
  };

  return (
    <Fragment>
      <Button size={'xs'} variant={'link'} onPress={handleRefuseFriend} style={{backgroundColor: 'transparent'}}>
        <ButtonText style={{color: '#f44336'}}>거절</ButtonText>
      </Button>
    </Fragment>
  );
};

const StyledButton = styled.Pressable``;
