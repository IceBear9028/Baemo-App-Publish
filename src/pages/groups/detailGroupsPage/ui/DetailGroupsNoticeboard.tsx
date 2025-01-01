import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {FabButton, Filter, FilterContainer, FilterOption} from '~/shared/ui';
import {GroupArticlesList, PreviewGroupNoticeArticleList} from 'widgets/groups/groupArticleList';
import {useArticleCategoryFilter} from '~/pages/groups/detailGroupsPage/model/useArticleCategoryFilter.ts';
import {EditIcon, FabIcon} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {RouteProp} from '@react-navigation/native';
import {DetailGatheringTabRoute} from '~/pages/groups/detailGroupsPage/ui/DetailGroupsPage.tsx';
import {useGroupRoleStore} from '~/features/groups/detailGroupsIntroduction';

interface DetailGroupsNoticeboardProps {
  route: RouteProp<DetailGatheringTabRoute, 'noticeBoard'>;
  navigation: any;
}

export const DetailGroupsNoticeboard = ({route}: DetailGroupsNoticeboardProps) => {
  const {role} = useGroupRoleStore();
  const {navigateGroupWriteArticlePage} = useMainNavigate();
  const {initCategoryId, categoryOption, categoryKeys, changeCategory} = useArticleCategoryFilter();

  return (
    <Fragment>
      <StyledContainer>
        <FilterContainer>
          <Filter initOption={initCategoryId} onChange={changeCategory}>
            {categoryKeys.map((optionKey, index) => {
              return <FilterOption key={`${optionKey}-${index}`} name={categoryOption[optionKey]} value={optionKey} />;
            })}
          </Filter>
        </FilterContainer>
        <GroupArticlesList groupsId={route.params.groupsId} articleCategoryId={initCategoryId} />
      </StyledContainer>
      {!(role === 'NON_MEMBER' || role === 'PENDING') && (
        <FabButtonContainer>
          <FabButton
            icon={<FabIcon as={EditIcon} />}
            title={'글쓰기'}
            onPress={() => navigateGroupWriteArticlePage(route.params.groupsId)}
          />
        </FabButtonContainer>
      )}
    </Fragment>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const FabButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  right: 4px;
`;
