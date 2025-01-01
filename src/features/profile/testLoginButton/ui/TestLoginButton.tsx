import {Button, ButtonText} from '@gluestack-ui/themed';
import {fetchTestLogin} from '../api/fetchLogin.tsx';

export const TestLoginButton = () => {
  return (
    <Button onPress={fetchTestLogin}>
      <ButtonText>로그인 확인</ButtonText>
    </Button>
  );
};
