import {ChattingRoom} from '~/shared/mapper/chatting';
import {Badge, BadgeText} from '@gluestack-ui/themed';
import {Fragment} from 'react';

interface ChattingBadgeProps {
  type: ChattingRoom['chatRoomType'];
}
//ChattingBadegProps는 0,1,2

export const ChattingBadge = ({type}: ChattingBadgeProps) => {
  switch (type) {
    case 'CLUB':
      return (
        <Badge action="success">
          <BadgeText>모임</BadgeText>
        </Badge>
      );
    case 'EXERCISE':
      return (
        <Badge action="warning">
          <BadgeText>운동</BadgeText>
        </Badge>
      );
    default:
      return <Fragment />;
  }
};
