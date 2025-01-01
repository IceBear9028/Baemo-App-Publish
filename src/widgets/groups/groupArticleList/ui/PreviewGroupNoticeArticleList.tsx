import {Groups} from '~/shared/mapper/groups';
import {useMainNavigate} from '~/shared/route';
import styled from 'styled-components/native';
import {useFetchGetGroupNoticeList} from '~/widgets/groups/groupArticleList/model/useFetchGetGroupNoticeList.ts';
import {Fragment} from 'react';
import {NoticeCard} from '~/entities/community/articleCard';

interface PreviewGroupNoticeArticleListProps extends Pick<Groups, 'groupsId'> {}

export const PreviewGroupNoticeArticleList = ({groupsId}: PreviewGroupNoticeArticleListProps) => {
  const {navigationDetailGroupArticle} = useMainNavigate();
  const {data} = useFetchGetGroupNoticeList(groupsId);
  return (
    <Fragment>
      {data?.length ? (
        <StyledArticleCardContainer>
          {data.map((notice, index) => (
            <NoticeCard key={`${notice.status}-${index}`} onPress={() => navigationDetailGroupArticle(notice.id, groupsId)} {...notice} />
          ))}
        </StyledArticleCardContainer>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

const StyledArticleCardContainer = styled.View`
  flex-direction: column;
`;
