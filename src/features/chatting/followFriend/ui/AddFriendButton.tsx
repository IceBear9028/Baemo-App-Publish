import {Fragment} from 'react';
import styled from 'styled-components/native';
import {useFetchPostRelationFriend} from '../model/useFetchPostRelationFriend.ts';
import {LoadingPageSpinner} from '~/shared/ui';
import {Button, ButtonText} from '@gluestack-ui/themed';

interface AddFriendButtonProps {
  targetId: number;
  text: string;
}

interface DisableFriendButtonProps {
  text: string;
}

export const AddFriendButton = ({targetId, text}: AddFriendButtonProps) => {
  const {isPending, mutate} = useFetchPostRelationFriend(targetId);

  const handleAddFriend = () => {
    mutate();
  };

  // if (isPending) {
  //   return <LoadingPageSpinner />;
  // }

  return (
    <Fragment>
      <Button size={'xs'} onPress={handleAddFriend}>
        <ButtonText>{text}</ButtonText>
      </Button>
    </Fragment>
  );
};

export const DisableFriendButton = ({text}: DisableFriendButtonProps) => {
  return (
    <Fragment>
      <Button size={'xs'} isDisabled={true}>
        <ButtonText>{text}</ButtonText>
      </Button>
    </Fragment>
  );
};

const StyledButton = styled.Pressable``;
