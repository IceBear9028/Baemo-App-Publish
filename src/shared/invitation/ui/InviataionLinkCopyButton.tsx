import {Button, ButtonIcon, CopyIcon} from '@gluestack-ui/themed';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '~/shared/notification/lib/showToast.ts';
// import {deeplinkUrlConverter} from '~/shared/deeplink/deeplinkUtils.ts';

interface InvitationLinkCopyButtonProps {
  domain: string;
  headerTitle?: string; // 241127 기준 headerTitle 미사용.
  id?: number; // nullable 이유: 아이디 없는 페이지의 공유 (공지 페이지 등)
}

export function InvitationLinkCopyButton({domain, headerTitle, id}: InvitationLinkCopyButtonProps) {
  const onCopyButtonClickHandler = () => {
    // url 생성
    // const url = deeplinkUrlConverter(domain, headerTitle, id);

    // 클립보드에 텍스트 복사
    // Clipboard.setString(url);
    showToast({title: '복사 성공', body: '클립보드에 초대 링크가 복사되었어요.'});
  };

  return (
    <Button onPress={onCopyButtonClickHandler}>
      <ButtonIcon>
        <CopyIcon />
      </ButtonIcon>
    </Button>
  );
}
