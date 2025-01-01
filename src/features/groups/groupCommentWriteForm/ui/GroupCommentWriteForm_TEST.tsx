import {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {Animated, Platform, TextInput} from 'react-native';
import {ArrowUpIcon, Button, ButtonIcon, Input, InputField, SafeAreaView, Text} from '@gluestack-ui/themed';
import {useAnimatedKeyboardHeight} from '~/shared/utils';
import {useGroupCommentStore} from '../model/useGroupCommentStore.ts';
import {useUploadGroupComment} from '../model/useUploadGroupComment.ts';

interface GroupCommentWriteFormProps {
  groupId: number;
  articleId: number;
}

export const GroupCommentWriteForm_TEST = ({articleId}: GroupCommentWriteFormProps) => {
  const {isPending, fetchUploadComment} = useUploadGroupComment(articleId);
  const {content, replyInfo, editCommentId, setContent, resetContent} = useGroupCommentStore();

  const inputRef = useRef<TextInput>(null);

  // 1. 대댓글을 달 경우, 댓글 클릭 시 자동으로 focus 처리
  // 2. 댓글 편집 시, 자동으로 focus 처리
  useEffect(() => {
    if (inputRef.current && (replyInfo || editCommentId)) {
      inputRef.current.focus();
    }
  }, [replyInfo, editCommentId]);

  return (
    <SafeAreaView style={{paddingBottom: Platform.OS === 'ios' ? 20 : 0}}>
      <StyledContainer>
        {replyInfo && (
          <StyledReplyContainer>
            <Text size={'sm'}>{`${replyInfo.commentUser.name} 에게 답장중...`}</Text>
            <StyledTextButton onPress={resetContent}>
              <Text size={'sm'} bold>
                취소
              </Text>
            </StyledTextButton>
          </StyledReplyContainer>
        )}
        {editCommentId && (
          <StyledReplyContainer>
            <Text size={'sm'}>댓글 편집중...</Text>
            <StyledTextButton onPress={resetContent}>
              <Text size={'sm'} bold>
                취소
              </Text>
            </StyledTextButton>
          </StyledReplyContainer>
        )}
        <StyledContentContainer>
          <StyledInputContainer>
            <Input variant={'rounded'} borderColor="$trueGray200">
              <InputField ref={inputRef as any} size={'sm'} placeholder={'댓글을 입력하세요'} value={content} onChangeText={setContent} />
            </Input>
          </StyledInputContainer>
          <Button borderRadius={'$full'} isDisabled={isPending || !content} onPress={() => fetchUploadComment()}>
            <ButtonIcon as={ArrowUpIcon} />
          </Button>
        </StyledContentContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

const StyledContainer = styled.View`
  align-items: center;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #d4d4d4;
  padding: 15px 15px 20px 15px;
`;

const StyledReplyContainer = styled.View`
  flex-direction: row;
  padding: 4px 0;
  gap: 8px;
`;

const StyledContentContainer = styled.View`
  flex-direction: row;
  gap: 14px;
`;

const StyledInputContainer = styled.View`
  align-self: stretch;
  flex: 1;
`;

const StyledTextButton = styled.TouchableOpacity``;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  flex: 1;
`;
const SendButton = styled.TouchableOpacity`
  background-color: #10b981;
  border-radius: 4px;
  padding: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 12px;
`;
