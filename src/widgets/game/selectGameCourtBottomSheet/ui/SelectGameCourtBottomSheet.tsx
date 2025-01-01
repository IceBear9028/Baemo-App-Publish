import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import React, {forwardRef, Fragment, useCallback} from 'react';
import {RepeatIcon, Icon, Text} from '@gluestack-ui/themed';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomModalHeader} from '~/shared/bottomSheet';
import {useFetchGetGameCourtList} from '~/features/game/fetchCourtList';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useSelectCourtNumberStore} from '../model/useSelectCourtNumberStore.ts';
import {GameCourt} from '~/shared/mapper/exercise';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {CourtCard} from '../ui/CourtCard.tsx';

export interface SelectGameCourtBottomSheetProps {
  index?: number;
  closeBottomSheet?: () => void;
}

export const SelectGameCourtBottomSheet = forwardRef<BottomSheetModalMethods, SelectGameCourtBottomSheetProps>(
  ({index = 0, closeBottomSheet}, ref) => {
    const {onSelectCourt, resetCourt} = useSelectCourtNumberStore();
    const {isFetchingCourtList, courtList, refetchCourtList} = useFetchGetGameCourtList();
    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          onPress={() => {
            props.onPress && props?.onPress();
            resetCourt();
          }}
          pressBehavior="close"
          appearsOnIndex={0} // 이거 추가
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    function selectCourtNumber(court: GameCourt) {
      onSelectCourt(court);
    }

    function closeBottomEvent() {
      closeBottomSheet && closeBottomSheet();
      resetCourt();
    }

    return (
      <Fragment>
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={['50%', '80%']}
          backdropComponent={renderBackdrop}
          animateOnMount={true}
          enableContentPanningGesture={false}
          enablePanDownToClose={false}>
          <BottomModalHeader title={'코트 선택'} onCloseBottomSheet={closeBottomEvent}>
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
                <Text bold>사용중인 코트</Text>
                <StyledCardListContainer>
                  {courtList?.map((court, id) => (
                    <CourtCard
                      key={`${id}-${court.courtId}`}
                      onSelectCourt={() => {
                        selectCourtNumber(court);
                      }}
                      onCloseBottom={closeBottomSheet}
                      {...court}
                    />
                  ))}
                </StyledCardListContainer>
              </StyledContentContainer>
            </BottomSheetScrollView>
          )}
        </BottomSheetModal>
      </Fragment>
    );
  },
);

const StyledContentContainer = styled.View`
  flex: 1;
  padding: 10px 20px;
  gap: 4px;
`;

const StyledFallbackContainer = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;

const StyledCardListContainer = styled.View`
  flex-wrap: wrap;
  gap: 16px;
  flex-direction: row;
  padding-top: 6px;
  margin-top: 6px;
`;

const StyledRefreshButton = styled.Pressable``;
