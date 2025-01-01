import styled from 'styled-components/native';
import CommentsIcon from '~/shared/images/svg/comments.svg';
import {Text} from '@gluestack-ui/themed';

interface ArticleCommentsButtonProps {
  isShowText?: boolean;
  onPress?: () => void;
  comments?: number;
}

export const ArticleCommentsButton = ({isShowText, onPress, comments}: ArticleCommentsButtonProps) => {
  return (
    <StyledPressContainer onPress={onPress}>
      <CommentsIcon width={17} height={17} />
      {isShowText && <Text size={'xs'}>답글달기</Text>}
      <Text size={'xs'}>{comments}</Text>
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.Pressable`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;
