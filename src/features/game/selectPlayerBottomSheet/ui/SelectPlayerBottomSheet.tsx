import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import React, {Fragment, useCallback, useMemo, useRef} from 'react';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet';
import {useFetchGetAllPlayers} from '~/features/game/selectPlayerBottomSheet/model/useFetchGetAllPlayers.ts';
import {Button, ButtonText, Icon, RepeatIcon, Text} from '@gluestack-ui/themed';
import {UserProfile} from '~/shared/mapper/userProfile';
import {BottomModalHeader} from '~/shared/bottomSheet';
import {SelectPlayerCard} from '~/entities/game/selectPlayerCard';
import {usePlayerStatusFilter} from '~/features/game/selectPlayerBottomSheet/model/usePlayerStatusFilter.ts';
import {PlayerStatusFilter} from '~/features/game/selectPlayerBottomSheet/ui/PlayerStatusFilter.tsx';

interface SelectPlayerBottomSheetProps {
  onSelect: (input: UserProfile) => void;
  selectPlayers: UserProfile[];
  exerciseId: number;
}

interface MemberListProps<T> {
  players?: T[];
  renderItem: (item: T) => React.ReactNode;
  fallback: React.ReactNode;
}

const MemberList = <T,>({players, renderItem, fallback}: MemberListProps<T>) => {
  if (!players || players.length <= 0) {
    return <>{fallback}</>;
  }
  return <>{players.map(renderItem)}</>;
};

export const SelectPlayerBottomSheet = ({onSelect, selectPlayers, exerciseId}: SelectPlayerBottomSheetProps) => {
  const {filterStatus, setChangeFilter} = usePlayerStatusFilter();
  const {isFetching, refreshPlayer, data} = useFetchGetAllPlayers(exerciseId, filterStatus);
  const ref = useRef<BottomSheetModal>(null);
  const resultSnapPoints = useMemo(() => ['50%', '95%'], []);
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
  const openBottomSheet = useCallback(() => {
    ref.current?.present();
  }, []);

  return (
    <Fragment>
      <Button onPress={openBottomSheet} variant={'outline'} isDisabled={selectPlayers.length >= 4}>
        <ButtonText>인원 추가하기</ButtonText>
      </Button>
      <BottomSheetModal ref={ref} index={0} snapPoints={resultSnapPoints} backdropComponent={renderBackdrop} animateOnMount={true}>
        <BottomModalHeader title={'인원 선택'}>
          <StyledRefreshButton onPress={() => refreshPlayer()}>
            <Icon as={RepeatIcon} color={'$textLight900'} />
          </StyledRefreshButton>
        </BottomModalHeader>
        {isFetching ? (
          <BottomSheetView>
            <StyledFallbackContainer>
              <ActivityIndicator size="small" />
            </StyledFallbackContainer>
          </BottomSheetView>
        ) : (
          <BottomSheetScrollView>
            <PlayerStatusFilter playerStatus={filterStatus} onChange={setChangeFilter} />
            <StyledContentContainer>
              <MemberList
                players={data}
                renderItem={user => {
                  const isSelected = !!selectPlayers.find(selectUser => selectUser.userId === user.userId);
                  return <SelectPlayerCard user={user} onSelect={onSelect} isSelect={isSelected} memberStatus={user.memberStatus} />;
                }}
                fallback={
                  <StyledFallbackContainer>
                    <Text size={'sm'}>인원이 없습니다.</Text>
                  </StyledFallbackContainer>
                }
              />
            </StyledContentContainer>
          </BottomSheetScrollView>
        )}
      </BottomSheetModal>
    </Fragment>
  );
};

const StyledContentContainer = styled.View`
  flex: 1;
  padding: 10px 20px;
  gap: 16px;
`;

const StyledFallbackContainer = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;

const StyledRefreshButton = styled.Pressable``;
