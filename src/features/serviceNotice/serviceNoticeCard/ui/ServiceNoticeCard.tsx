import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {ArticleCard} from '~/entities/community/articleCard';
import ViewersIcon from '~/shared/images/svg/visibility.svg';
import {ServiceNoticeArticle} from '~/shared/mapper/community';
import {GroupArticleAuthor} from '~/shared/mapper/userProfile';
import {useMainNavigate} from '~/shared/route';
import {formatTimeDifference} from '~/shared/utils';

interface ServiceNoticeCardProps extends ServiceNoticeArticle {
  onPress: () => void;
}

const AuthorInfo = (props: GroupArticleAuthor & Pick<ServiceNoticeArticle, 'createDate'>) => {
  const diffTime = formatTimeDifference(props.createDate);
  return (
    <StyledProfileContainer>
      <Text size={'xs'} color={'$textLight800'} bold>
        {props.name}
      </Text>
      <StyledDot />
      <Text size={'xs'} color={'$textLight400'}>
        {diffTime}
      </Text>
    </StyledProfileContainer>
  );
};

export const ServiceNoticeCard = (props: ServiceNoticeCardProps) => {
  const borderColor = useToken('colors', 'borderLight100');
  const {views, onPress, ...ArticleProps} = props;

  return (
    <StyledContainer borderColor={borderColor}>
      <ArticleCard {...ArticleProps} onPress={onPress} />
      <StyledStatusContainer>
        <AuthorInfo createDate={props.createDate} {...props.author} />
        <StyledStatusInputGroups>
          <StyledViewerContainer>
            <ViewersIcon />
            <Text size={'xs'}>{views}</Text>
          </StyledViewerContainer>
        </StyledStatusInputGroups>
      </StyledStatusContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{borderColor: string}>`
  border-color: ${({borderColor}) => borderColor};
  border-bottom-width: 1px;
  padding-top: 4px;
  padding-bottom: 14px;
  gap: 12px;
`;

const StyledStatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledStatusInputGroups = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const StyledDot = styled.View`
  width: 3px;
  height: 3px;
  border-radius: 3px;
  background: #d3d3d3;
`;

const StyledViewerContainer = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const StyledProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
