import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import React, {Fragment, useCallback, useRef} from 'react';
import {RepeatIcon, Icon, Button, ButtonText, Text} from '@gluestack-ui/themed';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomModalHeader} from '~/shared/bottomSheet';
import {useFetchGetGameCourtList} from '~/features/game/fetchCourtList';
import {CourtCard} from '~/widgets/game/gameCourtBottomSheet/ui/CourtCard.tsx';
import {AddCourtForm} from '~/widgets/game/gameCourtBottomSheet/ui/AddCourtForm.tsx';

export const GameCourtBottomSheet = () => {
  const ref = useRef<BottomSheetModal>(null);
  const {isFetchingCourtList, courtList, refetchCourtList} = useFetchGetGameCourtList();
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
  const extendBottomSheet = useCallback(() => {
    ref.current?.expand();
  }, []);
  const closeBottomSheet = useCallback(() => {
    ref.current?.close();
  }, []);
  return (
    <Fragment>
      <Button size={'xs'} variant={'outline'} onPress={openBottomSheet}>
        <ButtonText>코트 관리</ButtonText>
      </Button>
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={['55%', '85%']}
        backdropComponent={renderBackdrop}
        animateOnMount={true}
        enableContentPanningGesture={false}
        enablePanDownToClose={true}>
        <BottomModalHeader title={'코트 관리'} onCloseBottomSheet={closeBottomSheet}>
          <StyledRefreshButton onPress={() => refetchCourtList()}>
            <Icon as={RepeatIcon} color={'$textLight900'} />
          </StyledRefreshButton>
        </BottomModalHeader>
        {isFetchingCourtList ? (
          <BottomSheetView>
            <StyledFallbackContainer>
              <ActivityIndicator size="small" />
            </StyledFallbackContainer>
          </BottomSheetView>
        ) : (
          <BottomSheetScrollView>
            <StyledContentContainer>
              <AddCourtForm extendBottomSheet={extendBottomSheet} />
              <StyledBody>
                <Text bold>사용중인 코트</Text>
                <StyledCardListContainer>
                  {!courtList?.length && (
                    <StyledFallbackContainer>
                      <Text color={'$textLight900'}>코트가 없습니다.</Text>
                    </StyledFallbackContainer>
                  )}
                  {courtList?.map((court, id) => (
                    <CourtCard key={`${id}-${court.courtId}`} {...court} />
                  ))}
                </StyledCardListContainer>
              </StyledBody>
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
  gap: 42px;
`;

const StyledFallbackContainer = styled.View`
  flex: 1;
  height: 200px;
  justify-content: center;
  align-items: center;
`;

const StyledBody = styled.View`
  gap: 8px;
`;

const StyledCardListContainer = styled.View`
  flex-wrap: wrap;
  gap: 16px;
  flex-direction: row;
  padding-top: 6px;
  margin-top: 6px;
`;

const StyledRefreshButton = styled.Pressable``;

// const StyledFallbackContainer = styled.View`
//   justify-content: center;
//   align-items: center;
// `;
