import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {useEditThunderExerciseStore} from '../model/useEditThunderExerciseStore.ts';
import {NumberInput, SelectDatetimeInput, SelectTimeRangeInput} from '~/shared/ui';
import {useAnimatedKeyboardHeight} from '~/shared/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import React, {useEffect, useState} from 'react';
import {TextAreaLimitInput, TextLimitInput} from '~/shared/input';
import {Button, ButtonText, Input, InputField, Text} from '@gluestack-ui/themed';
import {LocationResponse, LocationSearch} from '~/pages/location/ui/LocationSearch.tsx';
import {LocationInput} from '~/pages/location';

export interface EditThunderExercisePageProps extends NativeStackScreenProps<RootMainStackParamList, 'editThunderExercisePage'> {}

export const EditThunderExercisePage = (navigate: EditThunderExercisePageProps) => {
  const keyboardHeight = useAnimatedKeyboardHeight();
  const {status, errors, loadStatus, ...set} = useEditThunderExerciseStore();
  const {title, description, location, locationDetail, participantLimit, exerciseStartTime, exerciseEndTime} = status;
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleSelectAddress = (locationResponse: LocationResponse) => {
    const newLocation = locationResponse.location;
    const newLocationDetail = locationResponse.locationDetail;
    if (newLocation) {
      set.setLocation(newLocation);
    }
    if (newLocationDetail) {
      set.setLocationDetail(newLocationDetail);
    }
    setOverlayVisible(!isOverlayVisible);
  };

  useEffect(() => {
    loadStatus(navigate.route.params);
  }, [navigate]);

  return (
    <StyledScrollContainer>
      <StyledContainer style={{marginBottom: keyboardHeight}}>
        <TextLimitInput label={'운동 이름'} value={title} onChange={set.setTitle} errorMessage={errors.title} />
        {/*<TextInput title={'장소'} value={location} onChangeText={set.setLocation} errorMessage={errors.location} />*/}
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
            onSelectDateTime={set.setStartTime}
            date={exerciseStartTime}
            errorMessage={errors.time}
          />
          <SelectTimeRangeInput title={'운동 시간'} onSelectTime={set.setEndTime} startDate={exerciseStartTime} endDate={exerciseEndTime} />
        </StyledTimeContainer>
        <NumberInput
          name={'참가자 정원 제한'}
          value={participantLimit}
          onChangeNumber={set.setParticipate}
          errorMessage={errors.participantLimit}
        />
        <TextAreaLimitInput
          label={'운동 소개글'}
          placeholder={'운동에 대한 소개글을 작성해주세요.'}
          value={description}
          onChange={set.setDescription}
          limitLength={500}
          height={400}
        />
      </StyledContainer>
    </StyledScrollContainer>
  );
};

const StyledScrollContainer = styled.ScrollView``;

const StyledContainer = styled(Animated.View)`
  margin-top: 32px;
  padding: 0 20px;
  gap: 32px;
`;

const StyledTimeContainer = styled.View`
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
`;
