import React, {useState} from 'react';
import styled from 'styled-components/native';
import {EditIcon, FabIcon, Text} from '@gluestack-ui/themed';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {useFetchGetGameList} from '~/features/game/fetchGameList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList, useMainNavigate} from '~/shared/route';
import {PrevGameCourtSection} from './PrevGameCourtSection';
import {FabButton, FabButtonContainer} from '~/shared/ui';
import {StatusGameSection} from './StatusGameSection';
import {useBottomSheetController} from '~/shared/bottomSheet';
import {SelectGameCourtBottomSheet} from '~/widgets/game/selectGameCourtBottomSheet';

interface EditGameStatusListProps extends Pick<NativeStackScreenProps<RootMainStackParamList, 'detailExercisePage'>, 'route'> {}

export const EditGameSettingList = ({route}: EditGameStatusListProps) => {
  const params = route.params;
  const {navigateCreateGame} = useMainNavigate();
  const {isFetching, data, refetch} = useFetchGetGameList(params.exerciseId);
  const {ref, openBottomSheet, closeBottomSheet, extendBottomSheet} = useBottomSheetController();

  if (isFetching) {
    return <ActivityIndicator size="small" />;
  }

  return (
    <StyledContainer>
      {data && (
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <StyledGameListContainer>
            <PrevGameCourtSection
              openBottomSheet={openBottomSheet}
              gameList={data.filter(game => game.gameStatus === 2 || game.gameStatus === 3)}
            />
            <StatusGameSection openBottomSheet={openBottomSheet} gameStatus={1} gameList={data.filter(game => game.gameStatus === 1)} />
            <StatusGameSection openBottomSheet={openBottomSheet} gameStatus={0} gameList={data.filter(game => game.gameStatus === 0)} />
            <StatusGameSection
              gameStatus={4}
              openBottomSheet={openBottomSheet}
              gameList={data.filter(game => game.gameStatus === 4 || game.gameStatus === 5)}
            />
          </StyledGameListContainer>
        </StyledScrollContainer>
      )}
      <FabButtonContainer>
        <FabButton
          icon={<FabIcon as={EditIcon} />}
          title={'게임 만들기'}
          onPress={() => navigateCreateGame({exerciseId: params.exerciseId})}
        />
      </FabButtonContainer>
      <SelectGameCourtBottomSheet ref={ref} closeBottomSheet={closeBottomSheet} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledScrollContainer = styled.ScrollView``;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledGameListContainer = styled.View`
  gap: 32px;
  padding: 24px 20px 120px 20px;
`;

const StyledPadding = styled.View`
  height: 320px;
`;
