import styled from 'styled-components/native';
import SearchButton from '~/shared/images/svg/header_search.svg';
import SettingButton from '~/shared/images/svg/header_settings.svg';
import NotificationButton from '~/shared/images/svg/header_notifications.svg';
import {useToken} from '@gluestack-ui/themed';
import {useNotificationStore} from '~/shared/notification';

interface ButtonProps {
  onPress?: () => void;
}

export const HeaderSearchButton = ({onPress}: ButtonProps) => {
  return (
    <StyledPressContainer onPress={onPress}>
      <SearchButton />
    </StyledPressContainer>
  );
};

export const HeaderSettingButton = ({onPress}: ButtonProps) => {
  return (
    <StyledPressContainer onPress={onPress}>
      <SettingButton />
    </StyledPressContainer>
  );
};

export const HeaderNotificationButton = ({onPress}: ButtonProps) => {
  const badgeBgColor = useToken('colors', 'rose400');
  const {hasOnMessage, setHasOnMessage} = useNotificationStore();

  const onPressHandler = () => {
    // 알림페이지 넘어갈 때 hasOnMessage -> false
    setHasOnMessage(false);
    onPress?.();
  };

  return (
    <StyledHeaderNotiContainer onPress={onPressHandler}>
      {hasOnMessage && <StyledNotiCustomBadge bgColor={badgeBgColor} />}
      <NotificationButton />
    </StyledHeaderNotiContainer>
  );
};

const StyledHeaderNotiContainer = styled.Pressable``;

const StyledNotiCustomBadge = styled.View<{bgColor: string}>`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({bgColor}) => bgColor};
  width: 4px;
  height: 4px;
  border-radius: 50px;
`;

const StyledPressContainer = styled.Pressable``;
