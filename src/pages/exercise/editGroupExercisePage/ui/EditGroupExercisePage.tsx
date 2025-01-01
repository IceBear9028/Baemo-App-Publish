import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useKeyboardHeight} from '~/shared/utils';
import {Button, ButtonSpinner, ButtonText, Input, InputField, Text} from '@gluestack-ui/themed';
import {useFetchPutGroupExercise, ValidEditDTO} from '../model/useFetchPutGroupExercise.ts';
import {NumberInput, SelectDatetimeInput, SelectTimeRangeInput} from '~/shared/ui';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import {useEditGroupExerciseStatus} from '../model/useEditGroupExerciseStatus.ts';
import {TextAreaLimitInput, TextLimitInput} from '~/shared/input';
import {LocationResponse, LocationSearch} from '~/pages/location/ui/LocationSearch.tsx';
import {LocationInput} from '~/pages/location';

export interface EditGroupExercisePageProps extends NativeStackScreenProps<RootMainStackParamList, 'editGroupExercisePage'> {}

export const EditGroupExercisePage = (navigate: EditGroupExercisePageProps) => {
  const keyboardHeight = useKeyboardHeight();
  const {exerciseStatus, isValid, errorMessage, ...set} = useEditGroupExerciseStatus(navigate.route.params);
  const {isPendingExercise, postExercise} = useFetchPutGroupExercise(navigate);
  const {name, location, intro, locationDetail} = exerciseStatus;
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleSelectAddress = (locationResponse: LocationResponse) => {
    const newLocation = locationResponse.location;
    const newLocationDetail = locationResponse.locationDetail;
    if (newLocation) {
      set.changeLocation(newLocation);
    }
    if (newLocationDetail) {
      set.changeLocationDetail(newLocationDetail);
    }
    setOverlayVisible(!isOverlayVisible);
  };

  useEffect(() => {
    navigate.navigation.setOptions({
      headerRight: () => (
        <Button variant="link" isDisabled={!isValid} onPress={() => postExercise(exerciseStatus as ValidEditDTO)}>
          {isPendingExercise ? <ButtonSpinner /> : <ButtonText>변경하기</ButtonText>}
        </Button>
      ),
    });
  }, [exerciseStatus, isValid]);

  return (
    <StyledScrollContainer>
      <StyledContainer bottomHeight={keyboardHeight}>
        <TextLimitInput label={'운동 이름'} value={name} onChange={set.changeName} errorMessage={errorMessage.name} />
        {/*<TextInput title={'장소'} value={location} onChangeText={set.changeLocation} errorMessage={errorMessage.location} />*/}
        <LocationSearchContainer>
          <Text color="$textDark800" lineHeight="$xs" size={'sm'}>
            장소
          </Text>
          <LocationSearchInputContainer>
            <LocationInput locationRes={{location, locationDetail}} onPress={() => setOverlayVisible(true)} />
            <Button size={'sm'} variant="outline" onPress={() => setOverlayVisible(true)}>
              <ButtonText>검색</ButtonText>
            </Button>
          </LocationSearchInputContainer>
        </LocationSearchContainer>
        {isOverlayVisible && (
          <LocationSearch isVisible={isOverlayVisible} onClose={() => setOverlayVisible(false)} onSelectAddress={handleSelectAddress} />
        )}
        <StyledTimeContainer>
          <SelectDatetimeInput
            title={'시작 시간'}
            onSelectDateTime={set.changeStartTime}
            date={exerciseStatus.startTime}
            errorMessage={errorMessage.time}
          />
          <SelectTimeRangeInput
            title={'운동 시간'}
            onSelectTime={set.changeEndTime}
            startDate={exerciseStatus.startTime}
            endDate={exerciseStatus.endTime}
          />
        </StyledTimeContainer>
        <NumberInput name={'모임원 정원 제한'} onChangeNumber={set.changeHeadCount} value={exerciseStatus.headCount} />
        <NumberInput name={'게스트 정원 제한'} onChangeNumber={set.changeGuestCount} value={exerciseStatus.guestHeadCount} />
        <TextAreaLimitInput
          label={'운동 소개글'}
          placeholder={'운동에 대한 소개글을 작성해주세요.'}
          value={intro}
          onChange={set.changeIntro}
          limitLength={500}
          height={400}
        />
      </StyledContainer>
    </StyledScrollContainer>
  );
};

const StyledScrollContainer = styled.ScrollView``;

const StyledContainer = styled.View<{bottomHeight: number}>`
  margin-top: 32px;
  padding: 0 20px;
  gap: 32px;
  margin-bottom: ${({bottomHeight}) => `${bottomHeight}px;`};
`;

const StyledTimeContainer = styled.View`
  //flex-direction: row;
  //justify-content: space-between;
  gap: 12px;
`;

const DateInputContainer = styled.View`
  width: 49%;
`;

const RangeTimeContainer = styled.View`
  width: 47%;
`;

const LocationSearchContainer = styled.View`
  display: flex;
  gap: 5px;
`;

const LocationSearchInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
