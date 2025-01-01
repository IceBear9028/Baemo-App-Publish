import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useKeyboardHeight} from '~/shared/utils';
import {Button, ButtonSpinner, ButtonText, Heading, Input, InputField, Text} from '@gluestack-ui/themed';
import {useGroupExerciseStatus} from '~/pages/exercise/createGroupExercisePage/model/useGroupExerciseStatus.ts';
import {SelectGroupInfo} from '~/pages/exercise/createGroupExercisePage/ui/SelectGroupInfo.tsx';
import {useFetchPostGroupExercise, ValidCreateDTO} from '../model/useFetchPostGroupExercise.ts';
import {NumberInput, SelectDatetimeInput, SelectTimeRangeInput} from '~/shared/ui';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TextAreaLimitInput, TextLimitInput} from '~/shared/input';
import {SelectProfileImage} from '~/shared/selectProfileImage';
import {RootMainStackParamList} from '~/shared/route';
import {LocationSearch, LocationResponse, LocationInput} from '~/pages/location';

interface CreateGroupExercisePageProps extends NativeStackScreenProps<RootMainStackParamList, 'createGroupExercisePage'> {}

export const CreateGroupExercisePage = ({navigation, route}: CreateGroupExercisePageProps) => {
  const {initGroup} = route.params;
  const keyboardHeight = useKeyboardHeight();
  const {isPendingExercise, postExercise} = useFetchPostGroupExercise();
  const {exerciseStatus, isValid, errorMessage, ...set} = useGroupExerciseStatus(initGroup);
  const {name, intro} = exerciseStatus;
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<LocationResponse | null>(null);

  const handleSelectAddress = (locationResponse: LocationResponse) => {
    // 주소 데이터를 로컬 상태에 설정 (버튼 텍스트 분기 처리)
    setSelectedAddress(locationResponse);

    const location = locationResponse.location;
    if (location) {
      set.changeLocation(location);
    }

    const locationDetail = locationResponse.locationDetail;
    if (locationDetail) {
      set.changeLocationDetail(locationDetail);
    }
    setOverlayVisible(!isOverlayVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button variant="link" isDisabled={!isValid} onPress={() => postExercise(exerciseStatus as ValidCreateDTO)}>
          {isPendingExercise ? <ButtonSpinner /> : <ButtonText>만들기</ButtonText>}
        </Button>
      ),
    });
  }, [exerciseStatus, isValid, isPendingExercise]);

  return (
    <StyledScrollContainer>
      <StyledContainer bottomHeight={keyboardHeight}>
        <StyledHeader>
          <Heading size={'xl'} color={'$primary500'} bold={true}>
            모임 운동 만들기
          </Heading>
        </StyledHeader>
        {exerciseStatus.group && <SelectGroupInfo {...exerciseStatus.group} />}
        <SelectProfileImage title={'운동 썸네일'} />
        <TextLimitInput label={'운동 이름'} value={name} onChange={set.changeName} errorMessage={errorMessage.name} />
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
        <NumberInput
          name={'모임원 정원 제한'}
          value={exerciseStatus.headCount}
          onChangeNumber={set.changeHeadCount}
          errorMessage={errorMessage.headCount}
        />
        <NumberInput
          name={'게스트 정원 제한'}
          value={exerciseStatus.guestHeadCount}
          onChangeNumber={set.changeGuestCount}
          errorMessage={errorMessage.guestHeadCount}
        />
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

const StyledHeader = styled.View`
  padding: 20px 0;
`;

const StyledContainer = styled.View<{bottomHeight: number}>`
  padding: 0 20px;
  gap: 24px;
  margin-bottom: ${({bottomHeight}) => `${bottomHeight}px;`};
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
