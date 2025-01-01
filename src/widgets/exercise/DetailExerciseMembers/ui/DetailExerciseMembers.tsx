import React from 'react';
import styled from 'styled-components/native';
import {RootMainStackParamList} from '~/shared/route';
import {Filter, FilterContainer, FilterOption} from '~/shared/ui';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMemberCategoryFilter} from '../model/useMemberCategoryFilter.ts';
import {DetailExerciseMemberList} from '~/features/exercise/detailExerciseMembersList';
import {InviteGuestButton} from '~/widgets/exercise/DetailExerciseMembers/ui/InviteGuestButton.tsx';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

interface DetailExerciseMembersProps extends Pick<NativeStackScreenProps<RootMainStackParamList, 'detailExercisePage'>, 'route'> {}

export const DetailExerciseMembers = ({route}: DetailExerciseMembersProps) => {
  const {type, status, groupRole} = useExerciseRoleStore();
  const {initCategoryId, categoryOption, categoryKeys, changeCategory} = useMemberCategoryFilter();
  return (
    <StyledContainer>
      <FilterContainer>
        <Filter initOption={initCategoryId} onChange={changeCategory}>
          {categoryKeys.map((optionKey, index) => {
            return <FilterOption key={`${optionKey}-${index}`} name={categoryOption[optionKey]} value={optionKey} />;
          })}
        </Filter>
      </FilterContainer>
      <DetailExerciseMemberList exerciseStatus={status} exerciseId={route.params.exerciseId} filter={initCategoryId} />
      {type === 'CLUB' && <InviteGuestButton groupRole={groupRole} status={status} exerciseId={route.params.exerciseId} />}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
