import styled from 'styled-components/native';
import {forwardRef, useCallback, useMemo, useState} from 'react';
import {Button, ButtonText, Input, InputField, Text} from '@gluestack-ui/themed';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BottomModalHeader} from '~/shared/bottomSheet';
import {useFetchPostSearchFriend} from '../model/useFetchPostSearchFriend.ts';
import {SearchFriendCard} from '../ui/SearchFriendCard.tsx';

interface Props {
  snapPoints?: string[];
  index?: number;
  closeBottomSheet: () => void;
}

export const FollowFriendBottomSheet = forwardRef<BottomSheetModalMethods, Props>(({index = 0, snapPoints = ['75%', '94%']}, ref) => {
  const [userCode, setUserCode] = useState('');
  const {isPending, result, isError, postSearchFriend, resetResult} = useFetchPostSearchFriend();

  const handleSearch = () => {
    postSearchFriend({userCode});
  };

  const handleReset = () => {
    setUserCode('');
    resetResult();
  };

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

  return (
    <BottomSheetModal ref={ref} index={index} snapPoints={resultSnapPoints} backdropComponent={renderBackdrop} onDismiss={handleReset}>
      <BottomModalHeader title={'친구찾기'} />
      <StyledContentContainer>
        <StyledHeaderContainer>
          <StyledInputContainer>
            <Input size="sm" variant="underlined">
              <InputField placeholder="친구 코드 입력" value={userCode} onChangeText={setUserCode} keyboardType="number-pad" />
            </Input>
          </StyledInputContainer>
          <Button size={'xs'} onPress={handleSearch}>
            <ButtonText>검색</ButtonText>
          </Button>
        </StyledHeaderContainer>
        {/*<Text>{JSON.stringify(result)}</Text>*/}
        <SearchFriendCard data={result} isLoading={isPending} error={isError} />
      </StyledContentContainer>
    </BottomSheetModal>
  );
});
const StyledContentContainer = styled.View``;

const StyledHeaderContainer = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  align-items: center;
`;

const StyledInputContainer = styled.View`
  flex: 1;
`;
