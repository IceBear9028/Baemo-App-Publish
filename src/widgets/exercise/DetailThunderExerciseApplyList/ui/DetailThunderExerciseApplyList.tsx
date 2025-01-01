import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import {ExerciseThunderPendingList} from '~/features/exercise/exerciseThunderPendingList';

interface DetailThunderExerciseApplyList extends NativeStackScreenProps<RootMainStackParamList, 'detailExercisePage'> {}

export const DetailThunderExerciseApplyList = ({route}: DetailThunderExerciseApplyList) => {
  return (
    <StyledContainer>
      <ExerciseThunderPendingList exerciseId={route.params.exerciseId} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
