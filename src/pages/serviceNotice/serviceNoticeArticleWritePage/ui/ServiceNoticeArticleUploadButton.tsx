import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useValidateArticle} from '../model/useValidateArticle.ts';
import {useFetchPostNoticeArticle} from '../model/useFetchPostNoticeArticle.ts';
import {useFetchEditNoticeArticle} from '../model/useFetchEditNoticeArticle.ts';

interface ServiceNoticeUploadButtonProps {
  articleId?: number;
}

interface EditArticleButtonProps {
  articleId: number;
}

export const ServiceNoticeArticleUploadButton = (props: ServiceNoticeUploadButtonProps) => {
  // articleId 가 있으면 게시글 변경으로 랜더링
  if (props.articleId) {
    return <EditArticleButton articleId={props.articleId} />;
  }
  return <CreateArticleButton />;
};

const CreateArticleButton = () => {
  const {isEmptyTitle, isEmptyText} = useValidateArticle();
  const {isPendingPost, postServiceNoticeArticle} = useFetchPostNoticeArticle();
  return (
    <Button action={'secondary'} variant={'link'} onPress={postServiceNoticeArticle} isDisabled={!isEmptyTitle || !isEmptyText}>
      {isPendingPost ? <ButtonSpinner /> : <ButtonText>업로드</ButtonText>}
    </Button>
  );
};

const EditArticleButton = ({articleId}: EditArticleButtonProps) => {
  const {isEmptyTitle, isEmptyText} = useValidateArticle();
  const {isPendingPut, putServiceNoticeArticle} = useFetchEditNoticeArticle();
  return (
    <Button
      action={'secondary'}
      variant={'link'}
      onPress={() => putServiceNoticeArticle(articleId)}
      isDisabled={!isEmptyTitle || !isEmptyText}>
      {isPendingPut ? <ButtonSpinner /> : <ButtonText>업로드</ButtonText>}
    </Button>
  );
};
