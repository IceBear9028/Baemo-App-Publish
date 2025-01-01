import React, {useState} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {Button, ButtonText, Heading, Input, InputField, Text} from '@gluestack-ui/themed';
import {useThunderExerciseStore} from '../model/useThunderExerciseStore';
import {NumberInput, SelectDatetimeInput, SelectTimeRangeInput} from '~/shared/ui';
import {useAnimatedKeyboardHeight} from '~/shared/utils';
import {SelectProfileImage} from '~/shared/selectProfileImage';
import {TextAreaLimitInput, TextLimitInput} from '~/shared/input';
import {LocationResponse, LocationSearch} from '~/pages/location/ui/LocationSearch.tsx';
import {LocationInput} from '~/pages/location';

export const CreateThunderExercisePage = () => {
  const {status, errors, ...set} = useThunderExerciseStore();
  // 주소 검색
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<LocationResponse | null>(null);

  const handleSelectAddress = (locationResponse: LocationResponse) => {
    setSelectedAddress(locationResponse);
    const location = locationResponse.location;
    const locationDetail = locationResponse.locationDetail;
    if (location) {
      set.setLocation(location);
    }
    if (locationDetail) {
      set.setLocationDetail(locationDetail);
    }
    setOverlayVisible(!isOverlayVisible);
  };

  return (
    <StyledScrollContainer>
      <StyledContainer>
        <StyledHeader>
          <Heading size={'xl'} color={'$primary500'} bold={true}>
            번개운동 만들기
          </Heading>
        </StyledHeader>
        <SelectProfileImage title={'운동 썸네일'} />
        <TextLimitInput label={'운동 이름'} value={status.title} onChange={set.setTitle} errorMessage={errors.title} />
        <LocationSearchContainer>
          <Text color="$textDark800" lineHeight="$xs" size={'sm'}>
            장소
          </Text>
          <LocationSearchInputContainer>
            <LocationInput locationRes={selectedAddress} onPress={() => setOverlayVisible(true)} />
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
            date={status.exerciseStartTime}
            errorMessage={errors.time}
          />
          <SelectTimeRangeInput
            title={'운동 시간'}
            onSelectTime={set.setEndTime}
            startDate={status.exerciseStartTime}
            endDate={status.exerciseEndTime}
          />
        </StyledTimeContainer>
        <NumberInput name={'참가자 정원 제한'} onChangeNumber={set.setParticipate} errorMessage={errors.participantLimit} />
        <TextAreaLimitInput
          label={'운동 소개글'}
          placeholder={'운동에 대한 소개글을 작성해주세요.'}
          value={status.description}
          onChange={set.setDescription}
          limitLength={500}
          height={400}
        />
      </StyledContainer>
    </StyledScrollContainer>
  );
};

const StyledScrollContainer = styled.ScrollView``;

const StyledContainer = styled.View`
  padding: 0 20px;
  gap: 24px;
`;

const StyledHeader = styled.View`
  padding: 20px 0;
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
  align-items: center;
`;
