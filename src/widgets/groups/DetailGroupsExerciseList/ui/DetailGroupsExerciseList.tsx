import React from 'react';
import styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {useExerciseFilter} from '../model/useExerciseFilter.ts';
import {GroupExerciseList} from '~/features/exercise/groupExerciseList';
import {useGroupRoleStore} from '~/features/groups/detailGroupsIntroduction';
import {DetailGatheringTabRoute} from '~/pages/groups/detailGroupsPage/ui/DetailGroupsPage.tsx';
import {CreateExerciseButton} from '~/widgets/groups/DetailGroupsExerciseList/ui/CreateExerciseButton.tsx';

interface DetailGroupsExerciseListProps {
  route: RouteProp<DetailGatheringTabRoute, 'exerciseList'>;
  navigation: any;
}

export const DetailGroupsExerciseList = ({route}: DetailGroupsExerciseListProps) => {
  const {role} = useGroupRoleStore();
  const {initCategoryId} = useExerciseFilter();
  return (
    <StyledContainer>
      {/*<Filter initOption={initCategoryId} onChange={changeCategory}>*/}
      {/*  {categoryKeys.map((optionKey, index) => {*/}
      {/*    return <FilterOption key={`${optionKey}-${index}`} name={categoryOption[optionKey]} value={optionKey} />;*/}
      {/*  })}*/}
      {/*</Filter>*/}
      <GroupExerciseList groupsId={route.params.groupsId} filterKey={initCategoryId} />
      {(role === 'ADMIN' || role === 'MANAGER') && <CreateExerciseButton group={route.params} />}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
