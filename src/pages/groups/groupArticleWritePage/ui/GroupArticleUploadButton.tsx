import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useValidateArticle} from '~/pages/groups/groupArticleWritePage/model/useValidateArticle.ts';
import {useFetchPostGroupArticle} from '~/pages/groups/groupArticleWritePage/model/useFetchPostGroupArticle.ts';
import {useFetchEditGroupArticle} from '~/pages/groups/groupArticleWritePage/model/useFetchEditGroupArticle.ts';

interface GroupArticleUploadButtonProps {
  groupsId: number;
  articleId?: number;
}

interface EditArticleButtonProps {
  groupsId: number;
  articleId: number;
}

export const GroupArticleUploadButton = (props: GroupArticleUploadButtonProps) => {
  // articleId 가 있으면 게시글 변경으로 랜더링
  if (props.articleId) {
    return <EditArticleButton groupsId={props.groupsId} articleId={props.articleId} />;
  }
  return <CreateArticleButton {...props} />;
};

const CreateArticleButton = ({groupsId}: GroupArticleUploadButtonProps) => {
  const {isArticleVal} = useValidateArticle();
  const {isPendingPost, postGroupArticle} = useFetchPostGroupArticle(groupsId);
  return (
    <Button action={'secondary'} variant={'link'} onPress={postGroupArticle} isDisabled={!isArticleVal}>
      {isPendingPost ? <ButtonSpinner /> : <ButtonText>업로드</ButtonText>}
    </Button>
  );
};

const EditArticleButton = ({groupsId, articleId}: EditArticleButtonProps) => {
  const {isArticleVal} = useValidateArticle();
  const {isPendingPut, putGroupArticle} = useFetchEditGroupArticle();
  return (
    <Button action={'secondary'} variant={'link'} onPress={() => putGroupArticle(articleId)} isDisabled={!isArticleVal}>
      {isPendingPut ? <ButtonSpinner /> : <ButtonText>업로드</ButtonText>}
    </Button>
  );
};
