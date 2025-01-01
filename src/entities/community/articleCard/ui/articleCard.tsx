import styled from 'styled-components/native';
import {Image, Text} from '@gluestack-ui/themed';
import {Article} from 'shared/mapper/community';
import {ArticleStatusBadge} from 'shared/ui';

interface ArticleCardProps extends Omit<Article, 'likes' | 'isLikedByUser' | 'comments' | 'views' | 'editDate'> {
  onPress?: () => void;
}

export const ArticleCard = (props: ArticleCardProps) => {
  return (
    <StyledContainer>
      <StyledContents onPress={props.onPress}>
        <StyledTextContents>
          <StyledBadgeContainer>
            <ArticleStatusBadge status={props.status} />
          </StyledBadgeContainer>
          <StyledTextHeader>
            <StyledTextContainer>
              <Text bold={true} numberOfLines={1} color="$textLight900">
                {props.title}
              </Text>
            </StyledTextContainer>
            <StyledTextContainer>
              <Text size={'sm'} numberOfLines={2} color={'$textLight400'}>
                {props.content}
              </Text>
            </StyledTextContainer>
          </StyledTextHeader>
        </StyledTextContents>
        {props.image && (
          <Image
            size={'md'}
            borderRadius={8}
            source={{
              uri: props.image,
            }}
            style={{
              width: 70,
              height: 70,
            }}
            backgroundColor={'#eeeeee'}
            alt={'작성글의 첫번째 이미지'}
          />
        )}
      </StyledContents>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: column;
  gap: 14px;
`;

const StyledContents = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledTextContents = styled.View`
  gap: 8px;
  flex: 1;
`;

const StyledTextHeader = styled.View`
  gap: 4px;
  width: auto;
`;

const StyledTextContainer = styled.View`
  max-height: 20px;
`;

const StyledBadgeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
