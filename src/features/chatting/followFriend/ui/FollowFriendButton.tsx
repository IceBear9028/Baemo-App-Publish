import {useBottomSheetController} from '~/shared/bottomSheet';
import {Fragment} from 'react';
import styled from 'styled-components/native';
import FollowFriendIcon from '~/shared/images/svg/follow_friend.svg';
import {FollowFriendBottomSheet} from '~/features/chatting/followFriend/ui/FollowFriendBottomSheet.tsx';

export const FollowFriendButton = () => {
  const {ref, openBottomSheet, closeBottomSheet} = useBottomSheetController();
  return (
    <Fragment>
      <StyledButton onPress={openBottomSheet}>
        <FollowFriendIcon />
      </StyledButton>
      <FollowFriendBottomSheet ref={ref} closeBottomSheet={closeBottomSheet} />
    </Fragment>
  );
};

const StyledButton = styled.Pressable``;
