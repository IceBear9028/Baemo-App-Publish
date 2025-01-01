import styled from 'styled-components/native';
import {Text, useToken} from '@gluestack-ui/themed';
import {formatTimeDifference} from '~/shared/utils';
import {useFetchPutNotificationRead} from '../model/useFetchPutNotificationRead';
import {NotificationIconGroupActive, NotificationIconExercise, NotificationIconNotice} from './NotificationListCardIcon';
import {NotificationDomain} from '~/shared/mapper/notification/lib/notificationList.ts';

interface NotificationListCardProps {
  id: number;
  domain: keyof NotificationDomain;
  domainId: number;
  title: string;
  isRead: boolean;
  body: string;
  createdDate: string;
}

export const NotificationListCard = ({id, domainId, domain, title, body, createdDate, isRead}: NotificationListCardProps) => {
  const titleColor = useToken('colors', 'textDark950');
  const badgeBgColor = useToken('colors', 'primary500');
  const {putNotificationRead} = useFetchPutNotificationRead(domain, domainId);
  return (
    <StyledContainer onPress={() => putNotificationRead(id)}>
      {domain === 'CLUB' ? (
        <NotificationIconGroupActive isRead={isRead} />
      ) : domain === 'EXERCISE' ? (
        <NotificationIconExercise isRead={isRead} />
      ) : (
        <NotificationIconNotice isRead={isRead} />
      )}

      <StyledNotiContainer>
        <StyledTitleContainer>
          <StyledTitle>
            <Text size={'sm'} style={{color: titleColor}}>
              {title}
            </Text>
          </StyledTitle>
          <StyledBadgeContainer>
            <Text size={'xs'} color={'$textLight400'}>
              {formatTimeDifference(createdDate)}
            </Text>
            {!isRead && <StyledCustomBadge bgColor={badgeBgColor} />}
          </StyledBadgeContainer>
        </StyledTitleContainer>
        <Text size={'xs'}>{body}</Text>
      </StyledNotiContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e7e7e7;
`;

const StyledNotiContainer = styled.View`
  flex: 1;
  gap: 4px;
`;
const StyledTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.View`
  flex: 0.95;
`;

const StyledBadgeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledCustomBadge = styled.View<{bgColor: string}>`
  background: ${({bgColor}) => bgColor};
  margin-left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50px;
`;
