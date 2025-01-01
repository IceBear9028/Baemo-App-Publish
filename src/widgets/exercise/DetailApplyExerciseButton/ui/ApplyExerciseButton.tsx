import React from 'react';
import styled from 'styled-components/native';
import {Exercise} from '~/shared/mapper/exercise';
import {useFetchApplyExercise} from '../model/useFetchApplyExercise.ts';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';

interface ApplyExerciseButtonProps extends Pick<Exercise, 'exerciseId' | 'exerciseType'> {}

interface ApplyGuestPlayerButton extends Pick<Exercise, 'exerciseId'> {}

export const ApplyExerciseButton = ({exerciseId, exerciseType}: ApplyExerciseButtonProps) => {
  const {isPendingApply, applyExercise} = useFetchApplyExercise(exerciseId);
  // Define the button text based on exerciseType
  const getButtonText = () => {
    switch (exerciseType) {
      case 'CLUB':
        return '참가하기';
      case 'IMPROMPTU':
        return '참가 신청하기';
      default:
        return '참가 신청하기';
    }
  };
  return (
    <StyledContainer>
      <Button size={'lg'} onPress={applyExercise}>
        {isPendingApply && <ButtonSpinner />}
        <ButtonText>{getButtonText()}</ButtonText>
      </Button>
    </StyledContainer>
  );
};

export const ApplyGuestPlayerButton = ({exerciseId}: ApplyGuestPlayerButton) => {
  const {isPendingApply, applyExercise} = useFetchApplyExercise(exerciseId);
  return (
    <StyledContainer>
      <Button size={'lg'} onPress={applyExercise}>
        {isPendingApply && <ButtonSpinner />}
        <ButtonText>게스트 신청하기</ButtonText>
      </Button>
    </StyledContainer>
  );
};

export const PendingExerciseButton = () => {
  return (
    <StyledContainer>
      <Button size={'lg'} isDisabled={true}>
        <ButtonText>승인 대기 중</ButtonText>
      </Button>
    </StyledContainer>
  );
};

export const NotRecruitingExerciseButton = () => {
  return (
    <StyledContainer>
      <Button size={'lg'} isDisabled={true}>
        <ButtonText>모집 중에만 참가가능</ButtonText>
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 0 20px 30px 20px;
`;
