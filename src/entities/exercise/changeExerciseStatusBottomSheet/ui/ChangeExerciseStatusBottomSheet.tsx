import styled from 'styled-components/native';
import {forwardRef, useCallback, useMemo} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {ExerciseStatus} from '~/shared/mapper/exercise';
import {ExerciseStatusCard} from './ExerciseStatusCard.tsx';
import {BottomModalHeader} from '~/shared/bottomSheet';

interface ChangeExerciseStatusBottomSheetProps {
  snapPoints?: string[];
  index?: number;
  closeBottomSheet: () => void;
  updateStatus?: keyof ExerciseStatus;
  prevStatus: keyof ExerciseStatus;
  onSelectRole: (input: keyof ExerciseStatus) => void;
}

const exerciseStatusOption = new ExerciseStatus();
const exerciseOptions = Object.keys(exerciseStatusOption)
  .filter(status => status === 'PROGRESS' || status === 'COMPLETE')
  .map(status => ({status: status as keyof ExerciseStatus, text: exerciseStatusOption[status as keyof ExerciseStatus]}));

export const ChangeExerciseStatusBottomSheet = forwardRef<BottomSheetModalMethods, ChangeExerciseStatusBottomSheetProps>(
  ({index = 0, snapPoints = [300], closeBottomSheet, onSelectRole, updateStatus, prevStatus}, ref) => {
    const exerciseOptionList = useMemo(() => exerciseOptions, []);
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

    function selectEvent(input: keyof ExerciseStatus) {
      closeBottomSheet();
      onSelectRole(input);
    }
    return (
      <BottomSheetModal ref={ref} index={index} snapPoints={resultSnapPoints} backdropComponent={renderBackdrop}>
        <BottomModalHeader title={'운동상태 변경'} />
        <StyledContainer>
          {exerciseOptionList.map((status, index) => {
            return (
              <ExerciseStatusCard
                key={`${index}-`}
                isSelect={prevStatus === status.status}
                exerciseStatus={status}
                onPress={() => selectEvent(status.status)}
              />
            );
          })}
        </StyledContainer>
      </BottomSheetModal>
    );
  },
);

const StyledContainer = styled.View`
  gap: 16px;
  padding: 10px 20px 0 20px;
`;
