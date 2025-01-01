import {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {TextInput} from 'react-native';
import {ArrowUpIcon, Button, ButtonIcon, Input, InputField, Text} from '@gluestack-ui/themed';
import {useGroupCommentStore} from '../model/useGroupCommentStore.ts';
import {useUploadGroupComment} from '../model/useUploadGroupComment.ts';
import {GroupArticle, Groups} from '~/shared/mapper/groups';

interface GroupCommentWriteFormProps extends Pick<GroupArticle, 'id'>, Pick<Groups, 'groupsId'> {}

export const GroupCommentWriteForm = ({groupsId, id}: GroupCommentWriteFormProps) => {
  const {isPending, fetchUploadComment} = useUploadGroupComment(id);
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
  );
};

const StyledContainer = styled.View`
  padding: 8px 16px 8px 16px;
  justify-content: center;
  border-top-width: 1px;
  border-color: #ccc;
  gap: 8px;
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
