import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import {ExerciseApplyGuestList} from '~/features/exercise/exerciseApplyGuestList';

interface DetailExerciseApplyGuestList extends Pick<NativeStackScreenProps<RootMainStackParamList, 'detailExercisePage'>, 'route'> {}

export const DetailExerciseApplyGuestList = ({route}: DetailExerciseApplyGuestList) => {
  return (
    <StyledContainer>
      <ExerciseApplyGuestList exerciseId={route.params.exerciseId} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
