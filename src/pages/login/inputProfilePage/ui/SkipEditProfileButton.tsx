import {useLoginNavigate} from '~/shared/route';
import {Button, ButtonText} from '@gluestack-ui/themed';
import {useProfileImageStore} from '~/shared/selectProfileImage';

export const SkipEditProfileButton = () => {
  const {navigateSuccessSignUp} = useLoginNavigate();
  const resetProfileStore = useProfileImageStore(store => store.resetProfileStore);

  function pressEvent() {
    resetProfileStore();
    navigateSuccessSignUp();
  }

  return (
    <Button variant={'link'} onPress={pressEvent} action={'secondary'}>
      <ButtonText>다음에 할래요</ButtonText>
    </Button>
  );
};
