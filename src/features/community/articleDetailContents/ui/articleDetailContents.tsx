import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {Article} from 'shared/mapper/community';
import {useFetchDetailArticle} from '../model/useFetchDetailArticle.ts';
import {ArticleStatusBadge, LoadingPageSpinner} from 'shared/ui';
import {ImageList} from '~/shared/ui';

interface ArticleDetailContentsProps extends Article {}

export const ArticleDetailContents = (props: ArticleDetailContentsProps) => {
  const {isError, isFetching, data} = useFetchDetailArticle(props.id);
  const imageList = data?.imageAll.map((item: any) => ({uri: item.path}));

  if (isError) {
    return <Text>에러발생</Text>;
  }
  if (isFetching) {
    return <LoadingPageSpinner />;
  }
  return (
    <StyledContainer>
      <ContentContainer>
        <HeaderContainer>
          <BadgeContainer>
            <ArticleStatusBadge status={props.status} />
          </BadgeContainer>
          <Heading size={'lg'}>{props.title}</Heading>
        </HeaderContainer>
        <Text>{data?.contentAll}</Text>
      </ContentContainer>
      {data && <ImageList srcList={imageList} />}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 24px;
`;

const ContentContainer = styled.View`
  gap: 10px;
`;

const HeaderContainer = styled.View`
  gap: 4px;
`;

const BadgeContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;
