import {useBottomSheetController} from '~/shared/bottomSheet';
import {Fragment} from 'react';
import HeaderFollowFriendIcon from '~/shared/images/svg/person_add_black.svg';
import {FollowFriendBottomSheet} from '~/features/chatting/followFriend/ui/FollowFriendBottomSheet.tsx';
import styled from 'styled-components/native';

export const HeaderFollowFriendButton = () => {
  const {ref, openBottomSheet, closeBottomSheet} = useBottomSheetController();
  return (
    <Fragment>
      <StyledButton onPress={openBottomSheet}>
        <HeaderFollowFriendIcon />
      </StyledButton>
      <FollowFriendBottomSheet ref={ref} closeBottomSheet={closeBottomSheet} />
    </Fragment>
  );
};

const StyledButton = styled.Pressable``;
