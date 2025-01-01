import {Animated, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {ArrowUpIcon, Button, ButtonIcon, Input, InputField} from '@gluestack-ui/themed';
import {useAnimatedKeyboardHeight} from '~/shared/utils';
import {useCommentStore} from '../model/useCommentStore';
import {useUploadComment} from '../model/useUploadComment';
import {useEffect, useRef} from 'react';

export const CommentWriteForm = () => {
  const {isPending, postComment} = useUploadComment();
  const keyboardHeight = useAnimatedKeyboardHeight();
  const {content, replyInfo, setContent} = useCommentStore();

  const inputRef = useRef<TextInput>(null);

  // 대댓글을 달 경우, 댓글 클릭 시 자동으로 focus 처리
  useEffect(() => {
    if (inputRef.current && replyInfo) {
      inputRef.current.focus();
    }
  }, [replyInfo]);

  return (
    <StyledContainer style={{marginBottom: keyboardHeight}}>
      <StyledInputContainer>
        <Input size={'sm'} variant={'rounded'} borderColor="$trueGray200">
          <InputField ref={inputRef as any} size={'sm'} placeholder={'댓글을 입력하세요'} value={content} onChangeText={setContent} />
        </Input>
      </StyledInputContainer>
      <Button size={'sm'} borderRadius={'$full'} disabled={isPending} onPress={postComment}>
        <ButtonIcon as={ArrowUpIcon} />
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled(Animated.View)`
  flex-direction: row;
  background-color: #fff;
  padding: 10px 20px;
  border-top-width: 1px;
  border-color: #ccc;
  gap: 14px;
`;

const StyledInputContainer = styled.View`
  align-self: stretch;
  flex: 1;
`;
