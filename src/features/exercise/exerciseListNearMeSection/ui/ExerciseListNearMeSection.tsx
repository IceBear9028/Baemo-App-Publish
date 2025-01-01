import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {Exercise} from '~/shared/mapper/exercise';
import {useMainNavigate} from '~/shared/route';
import {LoadingPageSpinner} from '~/shared/ui';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';
import {useFetchGetExerciseListNearMe} from '../model/useFetchGetExerciseListNearMe';

interface HeaderProps {
  region: string;
}

const Header = ({region}: HeaderProps) => {
  return (
    <StyledHeaderContainer>
      <StyledTitleGroup>
        <Heading size={'lg'} color={'$textLight950'}>
          내 주변 가까운 운동
        </Heading>
        <Text size={'sm'} bold={true}>
          {region}
        </Text>
      </StyledTitleGroup>
    </StyledHeaderContainer>
  );
};

export const ExerciseListNearMeSection = () => {
  const {isFetching, data} = useFetchGetExerciseListNearMe();
  const {navigateDetailExercise} = useMainNavigate();

  function pressEvent(selectedExercise: Exercise) {
    navigateDetailExercise(selectedExercise.exerciseId);
  }

  if (isFetching) {
    return <LoadingPageSpinner />;
  }
  return (
    <StyledContainer>
      <StyledCardList>
        {data &&
          data.payload.myClubExercises.map((exercise, index) => (
            <ExerciseCard key={`card-${index}`} onPress={() => pressEvent(exercise)} {...exercise} />
          ))}
      </StyledCardList>
    </StyledContainer>
  );
};

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;

const StyledTitleGroup = styled.View`
  gap: 4px;
`;

const StyledContainer = styled.View`
  padding: 20px 0 4px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledCardList = styled.View`
  gap: 8px;
  align-self: stretch;
`;
