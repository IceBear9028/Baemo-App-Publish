import {useToken} from '@gluestack-style/react';
import styled from 'styled-components/native';
import NotifyOnGroup from '~/shared/images/svg/notify_on_group.svg';
import NotifyOffGroup from '~/shared/images/svg/notify_off_group.svg';
import NotifyOnExercise from '~/shared/images/svg/notify_on_exercise.svg';
import NotifyOffExercise from '~/shared/images/svg/notify_off_exercise.svg';
import NotifyOnNotice from '~/shared/images/svg/notify_on_notice.svg';
import NotifyOffNotice from '~/shared/images/svg/notify_off_notice.svg';

interface NotificationIcon {
  isRead: boolean;
  onIcon?: any;
  offIcon?: any;
}

const OnOffNotificationIcon = ({isRead, onIcon, offIcon}: NotificationIcon) => {
  const borderColor = useToken('colors', 'trueGray200');
  // 알림을 읽었다면 Off Icon
  if (isRead) {
    return <StyledIcon borderColor={borderColor}>{offIcon}</StyledIcon>;
  } else {
    return <StyledIcon borderColor={borderColor}>{onIcon}</StyledIcon>;
  }
};

export const NotificationIconGroupActive = ({isRead}: NotificationIcon) => {
  return <OnOffNotificationIcon isRead={isRead} onIcon={<NotifyOnGroup />} offIcon={<NotifyOffGroup />} />;
};

export const NotificationIconExercise = ({isRead}: NotificationIcon) => {
  return <OnOffNotificationIcon isRead={isRead} onIcon={<NotifyOnExercise />} offIcon={<NotifyOffExercise />} />;
};

export const NotificationIconNotice = ({isRead}: NotificationIcon) => {
  return <OnOffNotificationIcon isRead={isRead} onIcon={<NotifyOnNotice />} offIcon={<NotifyOffNotice />} />;
};

const StyledIcon = styled.View<{borderColor: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 40px;
  border-width: 1px;
  border-color: ${({borderColor}) => borderColor};
  margin-right: 12px;
`;
